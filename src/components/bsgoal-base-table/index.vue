<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 11:29:04
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-08 17:24:14
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-table\index.vue
 * @Description: 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, unref, inject, watchEffect, watch } from 'vue'
import BsgoalBaseTableContent from '../bsgoal-base-table-content/index.vue'
import BsgoalBaseTablePagination from '../bsgoal-base-table-pagination/index.vue'
import BsgoalBaseTableEmpty from '../bsgoal-base-table-empty/index.vue'
import { useAutoHeight } from '../../combines/useComs.js'
import { useFetch } from '../../combines/useFetchs.js'
import { isBoolean } from '@/utils/common.js'

defineOptions({
  name: 'BsgoalBaseTable'
})

const props = defineProps({
  /**
   * >----------props----------<
   * {
   *  label: '' // 列名
   *  prop:  '' // 绑定字段
   * }
   * >----------slots----------<
   *
   *  menu: 顶部操作区域
   *  operation: 列表右侧操作区域
   *
   */
  configOptions: {
    type: [Array],
    default: () => []
  },
  /**
   * 表格数据
   */
  data: {
    type: [Array],
    default: () => []
  },
  /**
   * 是否包含多选列
   */
  selection: {
    type: [Boolean],
    default: false
  },
  /**
   * 是否包含操作列
   */
  operation: {
    type: [Boolean],
    default: false
  },
  /**
   * 操作列宽度
   */
  operationWidth: {
    type: [String, Number],
    default: 100
  },
  /**
   * 表格 loading 状态
   */
  loading: {
    type: [Boolean],
    default: false
  },
  /**
   * 请求的 promise
   */
  fetch: {
    type: [Object, Function],
    default: null
  },
  /**
   * 响应的 call
   */
  call: {
    type: [Object, Function],
    default: null
  },
  /**
   * 映射字段
   */
  mapProps: {
    type: [Object],
    default: () => ({
      currentPage: 'currentPage',
      pageSize: 'pageSize',
      rows: 'rows',
      total: 'total'
    })
  },
  /**
   * 表格高度 下边距值
   */
  expression: {
    type: [Number],
    default: 75
  },
  /**
   * 表格高度
   *
   *  默认 : 自动计算
   *  布尔值 : 默认表格高度
   *  字符串 : 直接赋值给 height
   *  数字   : 直接赋值给 height + 'px'
   */
  height: {
    type: [Number, String, Boolean],
    default: ''
  },
  /**
   * 是否显示分页
   */
  hasPage: {
    type: Boolean,
    default: true
  },
  /**
   * 每页显示条目个数
   */
  pageSize: {
    type: [Number],
    default: 20
  },
  /**
   * 是否显示合计
   */
  showSummary: {
    type: [Boolean],
    default: false
  },
  /**
   *  合计的列
   */
  summaryProps: {
    type: [Array],
    default: () => []
  },
  /**
   * 序号 列
   */
  serial: {
    type: [Boolean],
    default: false
  },
  /**
   * 主体style
   */
  bodyStyle: {
    type: [Object],
    default: () => ({})
  }
})

const emits = defineEmits(['select', 'select-all', 'selection-change', 'on-total-change'])

/**
 * @Author: canlong.shen
 * @description:
 * @param {*} computed
 * @default:
 * @return {*}
 */
const configOptionsGet = computed(() => {
  const { configOptions = [], operation = false, operationWidth = 0 } = props
  const options = unref(configOptions)
  const extraOptions = []
  if (operation) {
    extraOptions.push({
      label: '操作',
      fixed: 'right',
      prop: 'operation',
      width: operationWidth
    })
  }
  return [...options, ...extraOptions]
})
// 表格包裹元素
const EL_TABLE_WRAP_REF = ref(null)
// 折叠状态响应值
const transferFoldStatus = inject('transferFoldStatus')
watchEffect(() => {
  const { height } = props
  const status = transferFoldStatus ? transferFoldStatus.value : false
  const expressionVal = unref(props.expression)
  // 默认是打开表格高度自动计算的
  if (!isBoolean(height)) {
    useAutoHeight(EL_TABLE_WRAP_REF, { arg: status, expression: expressionVal, height })
  }
})

// 触发搜索
const mapPropsVal = unref(props.mapProps)
const mapPropsFuse = {
  currentPage: 'currentPage',
  pageSize: 'pageSize',
  rows: 'rows',
  total: 'total',
  ...mapPropsVal
}

const currentPage = ref(1)
const curPageSize = ref(props.pageSize)
const total = ref(0)
const searchParams = ref({})
const tableLoading = ref(props.loading)
const tableData = ref()
const resData = ref({})
const ping = () => {
  const { fetch, call, hasPage } = props
  const searchParamsVal = searchParams.value
  const currentPageVal = currentPage.value
  const pageSizeVal = curPageSize.value
  const fetchParams = {}
  for (const [prop, value] of Object.entries(searchParamsVal)) {
    if (!`${prop}`.startsWith('_')) {
      fetchParams[prop] = value
    }
  }
  // 显示分页的注入分页参数
  if (hasPage) {
    fetchParams[mapPropsFuse.currentPage] = currentPageVal
    fetchParams[mapPropsFuse.pageSize] = pageSizeVal
  }

  useFetch(fetch(fetchParams), call, tableLoading, resData)
}

watchEffect(() => {
  tableData.value = props.data
})

watch(resData, (data) => {
  // 存在分页才注入
  if (props.hasPage) {
    tableData.value = data[mapPropsFuse.rows]
    total.value = data[mapPropsFuse.total]
  } else {
    tableData.value = data
  }
})

watchEffect(() => {
  emits('on-total-change', total.value)
})

// 查询
const refreshList = (params = {}) => {
  searchParams.value = params
  currentPage.value = 1
  ping()
}
// 改变当前页
const triggerPaginationCurrentChange = (current = 1) => {
  currentPage.value = current
}
//改变页数
const triggerPaginationSizeChange = (size = 10) => {
  curPageSize.value = size
}

watch([currentPage, curPageSize], () => {
  ping()
})

// ---> S 左侧机构树折叠状态 <---
const TREE_SWITCH_STATUS = inject('TREE_SWITCH_STATUS')
// ---> E 左侧机构树折叠状态 <---

// ---> S 触发事件 <---
const triggerSelect = (selection, row) => {
  emits('select', selection, row)
}
const triggerSelectAll = (selection) => {
  emits('select-all', selection)
}
const triggerSelectionChange = (selection) => {
  emits('selection-change', selection)
}
// ---> E 触发事件 <---

// ---> S 暴露事件 <---

const BSGOAL_EL_TABLE_REF = ref(null)

const clearSelection = () => {
  BSGOAL_EL_TABLE_REF.value.clearSelection()
}

// ---> E 暴露事件 <---

// ---> S 表格绑定的方法 <---

const summaryMethod = (columns = '') => {
  const { summaryProps = [] } = props
  const dataList = columns.data
  const calcResultList = []

  summaryProps.forEach((prop = '', index = 0) => {
    let sum = 0
    const propDataList = dataList.map((mi) => mi[prop])
    propDataList.forEach((pfi) => {
      const valueInt = parseInt(pfi) || 0
      sum += valueInt
    })
    calcResultList[index] = sum
  })
  return ['合计', ...calcResultList]
}

// ---> E 表格绑定的方法 <---

// ---> S 兼容微前端 <---
const isMicroApp = window.__MICRO_APP_ENVIRONMENT__
// ---> E 兼容微前端 <---

// 暴露的属性
defineExpose({
  refreshList,
  clearSelection
})
</script>

<template>
  <div class="bsgoal-base-table">
    <div
      class="base_table"
      :class="{ 'base_table--tree': TREE_SWITCH_STATUS === false, bsgoal_micro_app: isMicroApp }"
      :style="bodyStyle"
    >
      <!-- S 表头操作区域 -->
      <div class="base_table_menu" v-if="$slots.menu">
        <slot name="menu"></slot>
      </div>
      <!-- E 表头操作区域 -->
      <!-- S 表格区域 -->
      <div ref="EL_TABLE_WRAP_REF">
        <el-table
          ref="BSGOAL_EL_TABLE_REF"
          stripe
          border
          highlight-current-row
          style="width: 100%"
          v-loading="tableLoading"
          sum-text="合计"
          :summary-method="summaryMethod"
          :show-summary="showSummary"
          :data="tableData"
          :header-cell-style="{
            fontWeight: 'bold',
            backgroundColor: '#EBEEF5',
            color: 'rgba(0,0,0,.85)',
            fontSize: '14px'
          }"
          @select="triggerSelect"
          @select-all="triggerSelectAll"
          @selection-change="triggerSelectionChange"
        >
          <!-- / 无数据展示内容 -->
          <template #empty>
            <BsgoalBaseTableEmpty />
          </template>
          <!-- / 无数据展示内容 -->
          <!-- / 序号 -->
          <el-table-column v-if="serial" type="index" width="55" label="序号" align="center" />
          <!-- / 序号 -->
          <!-- / 多选 -->
          <el-table-column v-if="selection" fixed="left" type="selection" width="40" />
          <!-- / 多选 -->
          <!-- / 表格内容 -->
          <template
            v-for="(
              {
                prop = '',
                label = '',
                align = 'center',
                width = '',
                fixed = false,
                tooltip = false,
                limit = 0,
                minWidth = ''
              } = {},
              index
            ) of configOptionsGet"
            :key="index"
          >
            <el-table-column
              :label="label"
              :align="align"
              :width="width"
              :fixed="fixed"
              :min-width="minWidth || `${label.length * 14 + 30}px`"
            >
              <template v-slot:default="{ row, column, $index }">
                <slot :name="prop" :row="row" :column="column" :index="$index">
                  <BsgoalBaseTableContent :limit="limit" :tooltip="tooltip" :data="row[prop]" />
                </slot>
              </template>
            </el-table-column>
          </template>
          <!-- / 表格内容 -->
        </el-table>
      </div>

      <!-- E 表格区域 -->

      <!-- S 分页 -->
      <BsgoalBaseTablePagination
        v-if="hasPage"
        :currentPage="currentPage"
        :total="total"
        :page-size="curPageSize"
        @on-current-change="triggerPaginationCurrentChange"
        @on-size-change="triggerPaginationSizeChange"
      />
      <!-- E 分页 -->
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-table {
  .base_table {
    padding: 16px;
  }

  .base_table_menu {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .el-table__body-wrapper {
    overflow-y: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }
  .base_table--tree {
    margin-top: 10px;
  }
  th > div.cell {
    white-space: nowrap;
  }

  .bsgoal_micro_app {
    .el-scrollbar {
      padding-bottom: 0px !important;
    }
    th.el-table__cell {
      overflow: initial !important;
    }
  }

  .el-table--border,
  .el-table--group {
    border: 0px solid #ebeef5;
  }
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 11:29:04
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-20 11:55:52
 * @FilePath: \common\src\components\bsgoal-base-table\index.vue
 * @Description: 
 * 
-->

<script>
export default {
  name: 'BsgoalBaseTable'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, unref, inject, watchEffect, watch, toRaw } from 'vue'
import BsgoalBaseTableContent from '../bsgoal-base-table-content/index.vue'
import BsgoalBaseTablePagination from '../bsgoal-base-table-pagination/index.vue'
import { useAutoHeight } from '../../combines/useComs.js'
import { useFetch } from '../../combines/useFetchs.js'

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
  }
})

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
  const status = transferFoldStatus ? transferFoldStatus.value : false
  useAutoHeight(EL_TABLE_WRAP_REF, { arg: status })
})

// 触发搜索
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchParams = ref({})
const tableLoading = ref(props.loading)
const tableData = ref(props.data)
const resData = ref({})
const ping = () => {
  const { fetch, call, mapProps } = props
  const searchParamsVal = searchParams.value
  const currentPageVal = currentPage.value
  const pageSizeVal = pageSize.value
  const fetchParams = { ...searchParamsVal }
  const mapPropsVal = unref(mapProps)

  fetchParams[mapPropsVal.currentPage] = currentPageVal
  fetchParams[mapPropsVal.pageSize] = pageSizeVal

  useFetch(fetch(fetchParams), call, tableLoading, resData)
}

watch(resData, (data) => {
  const { mapProps } = props
  const mapPropsVal = unref(mapProps)

  tableData.value = data[mapPropsVal.rows]
  total.value = data[mapPropsVal.total]
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
  pageSize.value = size
}

watch([currentPage, pageSize], () => {
  ping()
})

// 暴露的属性
defineExpose({
  refreshList
})
</script>

<template>
  <div class="bsgoal-base-table">
    <div class="base_table">
      <!-- S 表头操作区域 -->
      <div class="base_table_menu" v-if="$slots.menu">
        <slot name="menu"></slot>
      </div>
      <!-- E 表头操作区域 -->
      <!-- S 表格区域 -->
      <div ref="EL_TABLE_WRAP_REF">
        <el-table
          stripe
          border
          highlight-current-row
          style="width: 100%"
          v-loading="tableLoading"
          :data="tableData"
          :header-cell-style="{
            fontWeight: 'bold',
            backgroundColor: '#EBEEF5',
            color: 'rgba(0,0,0,.85)',
            fontSize: '14px'
          }"
        >
          <!-- / 无数据展示内容 -->
          <template #empty>
            <!-- <BsgBaseTableEmpty /> -->
          </template>
          <!-- / 无数据展示内容 -->
          <!-- / 多选 -->
          <el-table-column v-if="selection" fixed="left" type="selection" width="40" />
          <!-- / 多选 -->
          <!-- / 表格内容 -->
          <template
            v-for="(
              { prop = '', label = '', align = 'center', width = '', fixed = false } = {}, index
            ) of configOptionsGet"
            :key="index"
          >
            <el-table-column
              :label="label"
              :align="align"
              :width="width"
              :fixed="fixed"
              :min-width="`${label.length * 14 + 24}px`"
            >
              <template v-slot:default="{ row }">
                <slot :name="prop" :row="row">
                  <BsgoalBaseTableContent :data="row[prop]" />
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
        :total="total"
        @on-current-change="triggerPaginationCurrentChange"
        @on-size-change="triggerPaginationSizeChange"
      />
      <!-- E 分页 -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
.base_table {
  padding: 16px;
}
.base_table_menu {
  margin-bottom: 8px;
}
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

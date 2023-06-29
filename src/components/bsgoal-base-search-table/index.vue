<!--
 * @Author: canlong.shen
 * @Date: 2023-04-18 17:04:47
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-29 14:35:56
 * @FilePath: \common\src\components\bsgoal-base-search-table\index.vue
 * @Description: 查询+表格 基础组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, unref, provide, useSlots } from 'vue'
import BsgoalBaseSearch from '../bsgoal-base-search/index.vue'
import BsgoalBaseTable from '../bsgoal-base-table/index.vue'

defineOptions({
  name: 'BsgoalBaseSearchTable'
})

const props = defineProps({
  /**
   * >----------props----------<
   * {
   *
   *  label: '' // 列名
   *  prop : '' // 绑定字段
   *
   *
   *  value: '' // 初始值 (查询)
   *  type : '' // 查询组件的类型 (查询)
   *  item : false // 只为查询项
   *  single : false // 机构选择器配置为单个值输出
   *
   *
   *  width: 0  // 列宽度 (表格)
   *
   * }
   *
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
  tableData: {
    type: [Array],
    default: () => []
  },
  /**
   * 是否多选
   */
  selection: {
    type: [Boolean],
    default: false
  },
  /**
   * 是否配置操作列
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
   * 表格高度 下边距值
   */
  expression: {
    type: [Number],
    default: 75
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
   * 是否显示分页
   */
  hasPage: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示查询
   */
  hasSearch: {
    type: Boolean,
    default: true
  },
  /**
   * pageSize
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
  }
})

const emits = defineEmits(['select', 'select-all', 'selection-change', 'on-total-change'])

const transferFoldStatus = ref(false)
provide('transferFoldStatus', transferFoldStatus)

const options = unref(props.configOptions)

// 查询 配置项
const searchOptions = computed(() => {
  return options.filter((fi) => {
    const { type = '' } = fi
    return !!type
  })
})

// 表格 配置项
const tableOptions = computed(() => {
  return options.filter((fi) => {
    const { item = false } = fi
    return !item
  })
})

// 注入插槽列表
const slots = useSlots()
const slotNames = ref(Object.keys(slots))

// 触发查询
const BSGOAL_BASE_TABLE_REF = ref(null)
const triggerSearch = (searchParams) => {
  BSGOAL_BASE_TABLE_REF.value.refreshList(searchParams)
}

// ---> S 计算expression <---
const expresionGet = computed(() => {
  const { expression, hasPage } = props
  if (hasPage === false) {
    return 25
  }
  return expression
})
// ---> E 计算expression <---

// ---> S 刷新 <---
const BSGOAL_BASE_SEARCH_REF = ref(null)
const refresh = () => {
  const { hasSearch } = props
  if (unref(hasSearch)) {
    BSGOAL_BASE_SEARCH_REF.value.triggerOperationSearch()
  }
}
// ---> E 刷新 <---

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

const triggerTotalChange = (total = 0) => {
  emits('on-total-change', total)
}

// ---> E 触发事件 <---

// ---> S 暴露事件 <---

const clearSelection = () => {
  BSGOAL_BASE_TABLE_REF.value.clearSelection()
}

// ---> E 暴露事件 <---

// ---> S 暴露 <---

defineExpose({
  refresh,
  clearSelection
})
// ---> E 暴露 <---
</script>
<template>
  <div class="bsgoal-base-search-table">
    <div class="base_search_table">
      <!-- S 查询 -->
      <BsgoalBaseSearch
        ref="BSGOAL_BASE_SEARCH_REF"
        v-show="hasSearch"
        :config-options="searchOptions"
        @on-search="triggerSearch"
        @on-clear="triggerSearch"
      />
      <!-- E 查询 -->
      <!-- S 表格 -->
      <BsgoalBaseTable
        ref="BSGOAL_BASE_TABLE_REF"
        :show-summary="showSummary"
        :page-size="pageSize"
        :map-props="mapProps"
        :operationWidth="operationWidth"
        :config-options="tableOptions"
        :data="tableData"
        :selection="selection"
        :operation="operation"
        :expression="expresionGet"
        :fetch="fetch"
        :call="call"
        :has-page="hasPage"
        @select="triggerSelect"
        @select-all="triggerSelectAll"
        @selection-change="triggerSelectionChange"
        @on-total-change="triggerTotalChange"
      >
        <!-- S 顶部菜单 -->

        <template v-for="slotName of slotNames" v-slot:[slotName]="{ row = {} }">
          <slot :name="slotName" :row="row"></slot>
        </template>
        <!-- E 顶部菜单 -->
      </BsgoalBaseTable>
      <!-- E 表格 -->
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

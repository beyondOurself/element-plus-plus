<!--
 * @Author: canlong.shen
 * @Date: 2023-06-20 09:20:44
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-29 14:37:18
 * @FilePath: \common\src\components\bsgoal-base-tree-table\index.vue
 * @Description: 树结构  + 列表
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, useSlots, computed, provide, unref } from 'vue'
import BsgoalBaseTree from '../bsgoal-base-tree/index.vue'
import BsgoalBaseSearchTable from '../bsgoal-base-search-table/index.vue'

defineOptions({
  name: 'BsgoalBaseTreeTable'
})

const props = defineProps({
  /**
   * 树结构 的下边距
   */
  gasket: {
    type: [String, Number],
    default: 10
  },
  /**
   * 数据
   */
  treeData: {
    type: [Object, Array],
    default: () => []
  },
  /**
   * 配置
   */
  treeProps: {
    type: [Object],
    default: () => ({
      label: 'label',
      children: 'children',
      disabled: 'disabled',
      isLeaf: 'isLeaf',
      class: 'class'
    })
  },
  /**
   * 懒加载数据方法
   * () => {
   *   return Promise(resolve =>  resolve([]))
   * }
   */
  lazyLoad: {
    type: [Function],
    default: () => {}
  },
  /**
   * 初始化树节点
   * () => {
   *   return Promise(resolve =>  resolve([]))
   * }
   */
  initNode: {
    type: [Function],
    default: () => {}
  },

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
   * 节点的 key
   */
  nodeKey: {
    type: [String],
    default: 'key'
  },
  /**
   * 默认展开的节点
   */
  expandedKeys: {
    type: [Array],
    default: () => []
  },
  /**
   * 是否显示合计
   */
   showSummary: {
    type: [Boolean],
    default: false
  }
})

const emits = defineEmits([
  'on-click-tree',
  'on-switch-tree',
  'on-add-tree',
  'on-select-table',
  'on-select-all-table',
  'on-selection-change-table',
  'on-total-change-table'
])

// ---> S 注入插槽 <---
const slots = useSlots()
const slotNames = ref(Object.keys(slots))
// ---> E 注入插槽 <---

// ---> S 树 <---
const switchStatus = ref(true)
const triggerTreeSwitch = (status = '') => {
  switchStatus.value = status
}
provide('TREE_SWITCH_STATUS', switchStatus)
/**
 * @Author: canlong.shen
 * @description: 触发树 添加按钮 事件
 * @param {*} node
 * @param {*} data
 * @default:
 * @return {*}
 */
const triggerTreeAdd = ({ node, data } = {}) => {
  emits('on-add-tree', { node, data })
}
/**
 * @Author: canlong.shen
 * @description: 触发树 单击项事件
 * @param {*} value
 * @param {*} node
 * @param {*} treeNode
 * @param {*} event
 * @default:
 * @return {*}
 */
const triggerTreeClick = (value, node, treeNode, event) => {
  emits('on-click-tree', value, node, treeNode, event)
}

// ---> E 树 <---

// ---> S 表 <---
const BSGOAL_BASE_SEARCH_TABLE_REF = ref(null)
const refreshList = (params = {}) => {
  BSGOAL_BASE_SEARCH_TABLE_REF.value.refresh(params)
}

// ---> S 触发事件 <---
const triggerSelect = (selection = {}, row =[]) => {
  emits('on-select-table', selection, row)
}
const triggerSelectAll = (selection = {}) => {
  emits('on-select-all-table', selection)
}
const triggerSelectionChange = (selection = {}) => {
  emits('on-selection-change-table', selection)
}
const triggerTotalChange = (total = 0) => {
  emits('on-total-change-table', total)
}
// ---> E 触发事件 <---

// ---> S 暴露事件 <---

const clearSelection = () => {
  BSGOAL_BASE_SEARCH_TABLE_REF.value.clearSelection()
}

// ---> E 暴露事件 <---

// 暴露的属性
defineExpose({
  refreshList,
  clearSelection
})

// ---> E 表 <---

const tableStyler = computed(() => {
  const styler = {}
  const switchStatusValue = switchStatus.value
  if (switchStatusValue) {
    styler.minWidth = 'calc(100% - 250px)'
  } else {
    styler.minWidth = 'calc(100%)'
  }

  return styler
})
</script>
<template>
  <div class="bsgoal-base-tree-table">
    <div class="base_tree_table">
      <div class="base_tree_table--tree">
        <!-- S 树 -->
        <BsgoalBaseTree
          v-bind="$props"
          class="base_tree_table--tree"
          @on-switch="triggerTreeSwitch"
          @on-add="triggerTreeAdd"
          @on-click="triggerTreeClick"
        >
          <template #default="{ data }">
            <slot name="tree" :data="data"></slot>
          </template>

          <template #prefix="{ data }">
            <slot name="tree-prefix" :data="data"></slot>
          </template>
        </BsgoalBaseTree>
        <!-- E 树 -->
      </div>
      <div class="base_tree_table--table" :style="tableStyler">
        <!-- S 列表 -->
        <BsgoalBaseSearchTable
          ref="BSGOAL_BASE_SEARCH_TABLE_REF"
          v-bind="$props"
          :show-summary="showSummary"
          @select="triggerSelect"
          @select-all="triggerSelectAll"
          @selection-change="triggerSelectionChange"
          @on-total-change="triggerTotalChange"
        >
          <template v-for="slotName of slotNames" v-slot:[slotName]="{ row = {} }">
            <slot :name="slotName" :row="row"></slot>
          </template>
        </BsgoalBaseSearchTable>
        <!-- E 列表 -->
      </div>
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-tree-table {
  .base_tree_table {
    display: flex;
  }
  .base_tree_table--tree {
    /* flex-basis: 221px; */
    /* flex: auto; */
  }
  .base_tree_table--table {
    /* flex: 1; */
    overflow: hidden;
  }
}
</style>

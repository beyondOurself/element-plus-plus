<!--
 * @Author: canlong.shen
 * @Date: 2023-06-20 09:20:44
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-16 21:04:32
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-tree-table\index.vue
 * @Description: 树结构  + 列表
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, useSlots, computed, provide, unref, toRaw, toValue } from 'vue'
import BsgoalBaseTree from '../bsgoal-base-tree/index.vue'
import BsgoalBaseSearchTable from '../bsgoal-base-search-table/index.vue'
import { deepClone } from '@/utils/common.js'

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
   * 清空树
   */
  treeClearable: {
    type: [Boolean],
    default: false
  },
  /**
   * 数据
   */
  treeData: {
    type: [Object, Array],
    default: () => []
  },
  /**
   * 树 配置映射
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
   * 表格 配置映射
   */
  tableProps: {
    type: [Object],
    default: () => ({})
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
   * 中屏设备宽度的比例
   */
  medium: {
    type: [Number, String],
    default: 6
  },
  /**
   * 表格菜单自动布局
   */
  autoLayoutMenu: {
    type: [Boolean],
    default: false
  },
  /**
   * 加载子节点数据的函数
   */
  tableLoad: {
    type: [Function],
    default: () => {}
  },
  /**
   * 是否懒加载
   */
  tableLazy: {
    type: [Boolean],
    default: false
  },
  /**
   * 行数据的 Key
   */
  rowKey: {
    type: [String, Function],
    default: 'id'
  },
  /**
   * 默认展开所有扩展
   */
  defaultExpandAll: {
    type: [Boolean],
    default: false
  },
  /**
   * 初始树面板状态
   */
  initTreeShow: {
    type: [Boolean],
    default: true
  },

  /**
   * 数据概览 配置项
   */
  overviewOptions: {
    type: [Array],
    default: () => []
  },
  /**
   * 是否显示数据概览
   */
  hasOverview: {
    type: [Boolean],
    default: false
  },
  /**
   * 排序字段
   */
  sortFields: {
    type: [Array],
    default: () => []
  }
})

const emits = defineEmits([
  'on-click-tree',
  'on-switch-tree',
  'on-add-tree',
  'on-select-table',
  'on-select-all-table',
  'on-selection-change-table',
  'on-total-change-table',
  'on-change-table-search',
  'on-clear-table-search',
  'on-click-overview'
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
  const nodeValue = deepClone(toRaw(toValue(node)))
  const dataValue = deepClone(toRaw(toValue(data)))
  emits('on-add-tree', { node: nodeValue, data: dataValue })
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

const BSGOAL_BASE_TREE = ref(null)

const resetTreeChecked = () => {
  if (props.treeClearable) {
    BSGOAL_BASE_TREE.value.resetChecked()
  }
}

// ---> E 树 <---

// ---> S 表 <---
const BSGOAL_BASE_SEARCH_TABLE_REF = ref(null)
const refreshList = (params = {}) => {
  BSGOAL_BASE_SEARCH_TABLE_REF.value.refresh(params)
}

// ---> S 触发事件 <---
const triggerSelect = (selection = {}, row = []) => {
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

const triggerTableChange = (values = {}) => {
  emits('on-change-table-search', values)
}
const triggerTableSearchClear = (values = {}) => {
  resetTreeChecked()
  emits('on-clear-table-search', values)
}

const clickOverview = (option = {}) => {
  emits('on-click-overview', option)
}

// ---> E 触发事件 <---

// ---> S 暴露事件 <---

const clearSelection = () => {
  BSGOAL_BASE_SEARCH_TABLE_REF.value.clearSelection()
}

const getSearchModel = () => {
  return BSGOAL_BASE_SEARCH_TABLE_REF.value.getSearchModel()
}

// ---> E 暴露事件 <---

// 暴露的属性
defineExpose({
  refreshList,
  clearSelection,
  getSearchModel
})

// ---> E 表 <---

const tableStyler = computed(() => {
  const styler = {}
  const switchStatusValue = switchStatus.value

  styler.width = '100%'
  // if (switchStatusValue) {
  //   styler.maxWidth = 'calc(100% - 250px)'
  // } else {
  //   styler.maxWidth = 'calc(100%)'
  // }
  return styler
})

const mapPropsGet = computed(() => {
  const { mapProps = {}, tableProps = {} } = props
  return { ...mapProps, ...tableProps }
})
</script>
<template>
  <div class="bsgoal-base-tree-table">
    <div class="base_tree_table">
      <div class="base_tree_table--tree">
        <!-- S 树 -->
        <BsgoalBaseTree
          ref="BSGOAL_BASE_TREE"
          v-bind="$props"
          class="base_tree_table--tree"
          :tree-props="treeProps"
          :initShow="initTreeShow"
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
          :summary-props="summaryProps"
          :load="tableLoad"
          :lazy="tableLazy"
          :rowKey="rowKey"
          :defaultExpandAll="defaultExpandAll"
          :map-props="mapPropsGet"
          @on-click-overview="clickOverview"
          @select="triggerSelect"
          @select-all="triggerSelectAll"
          @selection-change="triggerSelectionChange"
          @on-total-change="triggerTotalChange"
          @on-change="triggerTableChange"
          @on-clear="triggerTableSearchClear"
        >
          <template
            v-for="slotName of slotNames"
            v-slot:[slotName]="{ row = {}, column = {}, index = 0 }"
          >
            <slot :name="slotName" :row="row" :column="column" :index="index"></slot>
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
  .base_table {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>

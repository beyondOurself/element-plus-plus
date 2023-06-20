<!--
 * @Author: canlong.shen
 * @Date: 2023-06-20 09:20:44
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-20 18:52:36
 * @FilePath: \common\src\components\bsgoal-base-tree-table\index.vue
 * @Description: 树结构  + 列表
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, useSlots, computed , provide  } from 'vue'
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
  data: {
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
  }
})

// ---> S 注入插槽 <---
const slots = useSlots()
const slotNames = ref(Object.keys(slots))
// ---> E 注入插槽 <---

// ---> S 树 <---
const switchStatus = ref(true)
const switchTree = (status = '') => {
  switchStatus.value = status
  console.log('status', status)
}
provide('TREE_SWITCH_STATUS',switchStatus)

// ---> E 树 <---

const tableStyler = computed(() => {
  const styler = {}
  const switchStatusValue = switchStatus.value
  if (switchStatusValue) {
    styler.maxWidth = 'calc(100% - 250px)'
  } else {
    styler.maxWidth = 'calc(100%)'
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
          @on-switch="switchTree"
        ></BsgoalBaseTree>
        <!-- E 树 -->
      </div>
      <div class="base_tree_table--table" :style="tableStyler">
        <!-- S 列表 -->
        <BsgoalBaseSearchTable v-bind="$props">
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

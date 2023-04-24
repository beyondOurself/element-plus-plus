<!--
 * @Author: canlong.shen
 * @Date: 2023-04-18 17:04:47
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-20 12:00:37
 * @FilePath: \common\src\components\bsgoal-base-search-table\index.vue
 * @Description: 查询+表格 基础组件
 * 
-->

<script>
export default {
  name: 'BsgoalBaseSearchTable'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, unref, provide, useSlots, watch, watchEffect } from 'vue'
import BsgoalBaseSearch from '../bsgoal-base-search/index.vue'
import BsgoalBaseTable from '../bsgoal-base-table/index.vue'
// props
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
  }
})

const transferFoldStatus = ref(false)
provide('transferFoldStatus', transferFoldStatus)

const options = unref(props.configOptions)

// 查询 配置项
const searchOptions = computed(() => {
  return options
})

// 表格 配置项
const tableOptions = computed(() => {
  return options
})

// 注入插槽列表
const slots = useSlots()
const slotNames = ref(Object.keys(slots))

// 触发查询
const BSGOAL_BASE_TABLE_REF = ref(null)
const triggerSearch = (searchParams) => {
  BSGOAL_BASE_TABLE_REF.value.refreshList(searchParams)
}
</script>
<template>
  <div class="bsgoal-base-search-table">
    <div class="base_search_table">
      <!-- S 查询 -->
      <BsgoalBaseSearch :config-options="searchOptions" @on-search="triggerSearch" @on-clear="triggerSearch" />
      <!-- E 查询 -->
      <!-- S 表格 -->
      <BsgoalBaseTable
        ref="BSGOAL_BASE_TABLE_REF"
        :operationWidth="operationWidth"
        :config-options="tableOptions"
        :data="tableData"
        :selection="selection"
        :operation="operation"
        :fetch="fetch"
        :call="call"
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
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-09-22 17:51:19
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-22 18:53:30
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-list\index.vue
 * @Description: 列表组件 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
defineOptions({
  name: 'BsgoalBaseList'
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
   * 是否显示查询
   */
  hasSearch: {
    type: Boolean,
    default: true
  },
  /**
   * 中屏设备宽度的比例
   */
  medium: {
    type: [Number, String],
    default: 6
  }
})

const emits = defineEmits(['on-change', 'on-clear'])



// ---> E 触发事件 <---

// ---> S 查询事件 <---
const BSGOAL_BASE_SEARCH_REF = ref(null)
const refresh = () => {
  BSGOAL_BASE_SEARCH_REF.value.triggerOperationSearch()
}

const getSearchParams = () => {
  const searchParamsValue = BSGOAL_BASE_SEARCH_REF.value.triggerOperationSearch(false)
  return { ...searchParamsValue }
}

const triggerSearch = (searchParams) => {
    
}


const triggerClear = (searchParams) => {
  emits('on-clear', searchParams)
}


const triggerChange = (changer = {}) => {
  emits('on-change', changer)
}

// ---> E 查询事件 <---

defineExpose({
  refresh,
  getSearchParams
})
</script>
<template>
  <div class="bsgoal-base-list">
    <div class="base_list">
      <!-- S 查询 -->
      <BsgoalBaseSearch
        ref="BSGOAL_BASE_SEARCH_REF"
        v-show="hasSearch"
        :config-options="searchOptions"
        :medium="medium"
        @on-search="triggerSearch"
        @on-clear="triggerClear"
        @on-change="triggerChange"
      />
      <!-- E 查询 -->
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-list {
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-06-27 16:30:46
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-27 16:36:12
 * @FilePath: \common\src\components\bsgoal-base-table-pagination\demo.vue
 * @Description: 分页公共组件 demo
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseTablePagination from './index.vue'
defineOptions({
  name: 'BsgoalBaseTablePaginationDemo'
})

const props = defineProps({})
</script>
<template>
  <div class="bsgoal-base-table-pagination-demo">
    <BsgoalBaseTablePagination />
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

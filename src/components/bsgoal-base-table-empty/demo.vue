<!--
 * @Author: canlong.shen
 * @Date: 2023-04-28 08:47:41
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-28 09:21:12
 * @FilePath: \common\src\components\bsgoal-base-table-empty\demo.vue
 * @Description: 表格空数据 公共组件 展示
 * 
-->

<script>
export default {
  name: 'BsgoalBaseTableEmptyDemo'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseTableEmpty from './index.vue'
// props
const props = defineProps({})
</script>
<template>
  <div class="bsgoal-base-table-empty-demo">
    <div class="base_table_empty_demo">
      <BsgoalBaseTableEmpty />
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

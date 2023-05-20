<!--
 * @Author: canlong.shen
 * @Date: 2023-05-20 13:51:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-20 14:48:43
 * @FilePath: \common\src\components\bsgoal-base-layout\demo.vue
 * @Description: 布局组件 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseLayout from './index.vue'
// props
const props = defineProps({})
</script>
<script>
export default {
  name: 'BsgoalBaseLayoutDemo'
}
</script>
<template>
  <div class="bsgoal-base-layout-demo">
    <BsgoalBaseLayout>
      <template #area>
        <div>0</div>
      </template>
      <template #area1>
        <div>1</div>
      </template>
      <template #area2>
        <div>2</div>
      </template>
      <template #area13>
        <div>3</div>
      </template>
    </BsgoalBaseLayout>
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

<!--
 * @Author: canlong.shen
 * @Date: 2023-09-27 09:51:56
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-27 10:13:44
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-gap\demo.vue
 * @Description: 分割 - 颜色
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseGap from './index.vue'
defineOptions({
  name: 'BsgoalBaseGapDemo'
})
const props = defineProps({})
</script>
<template>
  <div class="bsgoal-base-gap-demo">
    <BsgoalBaseGap />
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

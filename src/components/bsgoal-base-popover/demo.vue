<!--
 * @Author: canlong.shen
 * @Date: 2023-06-21 15:12:45
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-21 15:41:54
 * @FilePath: \common\src\components\bsgoal-base-popover\demo.vue
 * @Description: 弹出框 演示
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBasePopover from './index.vue';
defineOptions({
  name: 'BsgoalBasePopoverDemo'
})

const props = defineProps({})
</script>
<template>
  <div class="bsgoal-base-popover-demo">
     <BsgoalBasePopover content="这是内容" :width="300">
         <span>愚蠢的地球人</span>
     </BsgoalBasePopover>
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

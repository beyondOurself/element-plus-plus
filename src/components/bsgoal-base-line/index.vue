<!--
 * @Author: canlong.shen
 * @Date: 2023-04-13 17:12:43
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-26 15:59:36
 * @FilePath: \common\src\components\bsgoal-base-line\index.vue
 * @Description: 分割线公共组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'

defineOptions({
  name: 'BsgoalBaseLine'
})

const props = defineProps({
  /**
   * 是否为垂直
   */
  vertical: {
    type: [Boolean],
    default: false
  }
})
</script>
<template>
  <div class="bsgoal-base-line" :class="{ 'bsgoal-base-line__vertical': vertical }">
    <div class="base_line" :class="{ base_line__vertical: vertical }"></div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-line {
  .base_line {
    height: 10px;
    background-color: #f0f2f5;
  }

  .bsgoal-base-line__vertical {
    display: inline-block;
    height: 100%;
  }
  .base_line__vertical {
    width: 10px;
    height: 100%;
  }
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-13 17:12:43
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-20 19:14:29
 * @FilePath: \common\src\components\bsgoal-base-line\index.vue
 * @Description: 分割线公共组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, inject, watchEffect } from 'vue'

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

// ---> S 左侧机构树折叠状态 <---
const TREE_SWITCH_STATUS = inject('TREE_SWITCH_STATUS')
// ---> E 左侧机构树折叠状态 <---
</script>

<template>
  <div class="bsgoal-base-line" :class="{ 'bsgoal-base-line__vertical': vertical }">
    <div
      class="base_line"
      :class="{
        'base_line__vertical': vertical,
        'bsgoal-base-line__fill': TREE_SWITCH_STATUS === false
      }"
    ></div>
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

  .bsgoal-base-line__fill {
    position: absolute;
    left: 0;
    right: 0;
  }
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 17:46:21
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 18:27:22
 * @FilePath: \common\src\components\bsgoal-base-item\index.vue
 * @Description: 表单项 
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
const props = defineProps({
  /**
   * label 后缀
   */
  suffix: {
    type: [String],
    default: ':'
  }
})
</script>
<script>
export default {
  name: 'BsgoalBaseItem'
}
</script>
<template>
  <div class="bsgoal-base-item">
    <div class="base_item">
      <div class="base_item_label">
        <slot name="label"> </slot> <span>{{ suffix }}</span>
      </div>
      <div class="base_item_contetn">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-item {
  .base_item {
    display: flex;
    align-items: center;
  }
  .base_item_label {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #606266;
    height: 32px;
    line-height: 32px;
    padding-right: 12px;
  }
}
</style>

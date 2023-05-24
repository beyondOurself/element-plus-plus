<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 09:12:54
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 10:06:36
 * @FilePath: \common\src\components\bsgoal-base-alert\index.vue
 * @Description: alert 提示组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
// props
const props = defineProps({
  /**
   * 类型
   */
  type: {
    type: [String],
    default: 'info',
    validator: (v) => ['success', 'warning', 'info', 'error'].includes(v)
  }
})
</script>
<script>
export default {
  name: 'BsgoalBaseAlert'
}
</script>
<template>
  <div class="bsgoal-base-alert">
    <el-alert class="base_alert" :type="type" show-icon>
      <template #title>
        <slot></slot>
      </template>
    </el-alert>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-alert {
  .el-alert {
    display: flex;
    align-items: center;
  }
}
</style>

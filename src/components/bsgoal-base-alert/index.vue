<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 09:12:54
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-21 17:41:49
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-alert\index.vue
 * @Description: alert 提示组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'

defineOptions({
  name: 'BsgoalBaseAlert'
})

const props = defineProps({
  /**
   * 类型
   */
  type: {
    type: [String],
    default: 'info',
    validator: (v) => [ 'success', 'warning', 'info', 'error'].includes(v)
  }
})
</script>
<template>
  <div class="bsgoal-base-alert">
    <el-alert class="base_alert" :type="type" show-icon  >
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

  .el-alert__close-btn {
    top: 0 !important;
    bottom: 0;
    margin: auto;
  }
}
</style>

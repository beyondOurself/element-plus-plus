<!--
 * @Author: canlong.shen
 * @Date: 2023-05-18 16:24:25
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-18 17:00:41
 * @FilePath: \common\src\components\bsgoal-base-button\index.vue
 * @Description: 统一按钮 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, unref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

// props
const props = defineProps({
  task: {
    type: [Object, Function],
    default: () => {
      Promise.resolve()
    }
  },
  type: {
    type: [String],
    default: 'primary',
    validator: (v) => ['primary', 'success', 'warning', 'danger', 'info'].includes(v)
  },
  icon: {
    type: [String, Object],
    default: Plus
  },
  content: {
    type: [String],
    default: '新增'
  }
})

// ---> S 触发按钮 <---
const loading = ref(false)
const triggerClick = () => {
  loading.value = true
  const { task } = props
  const taskValue = unref(task)
  taskValue()
    .then()
    .finally(() => {
      loading.value = false
    })
}
// ---> E 触发按钮 <---
</script>
<script>
export default {
  name: 'BsgoalBaseButton'
}
</script>
<template>
  <div class="bsgoal-base-button">
    <div class="base_button" @click="triggerClick">
      <slot :loading="loading">
        <el-button :type="type" :icon="icon" :loading="loading">{{ content }}</el-button>
      </slot>
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-button {
  &,
  .base_button {
    display: inline-block;
  }
}
</style>

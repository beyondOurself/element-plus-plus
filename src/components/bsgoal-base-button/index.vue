<!--
 * @Author: canlong.shen
 * @Date: 2023-05-18 16:24:25
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-25 09:26:22
 * @FilePath: \common\src\components\bsgoal-base-button\index.vue
 * @Description: 统一按钮 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, unref, computed } from 'vue'
import { Delete, Plus, CloseBold, Select } from '@element-plus/icons-vue'

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
    default: '',
    validator: (v) => ['primary', 'success', 'warning', 'danger', 'info'].includes(v)
  },
  icon: {
    type: [String, Object],
    default: ''
  },
  content: {
    type: [String],
    default: ''
  },
  mode: {
    type: [String],
    default: 'default',
    validator: (v) => ['add', 'delete', 'edit', 'detail', 'default', 'cancel'].includes(v)
  },
  values: {
    type: [Array, Object],
    default: () => ({})
  },
  plain: {
    type: [Boolean],
    default: false
  }
})

// ---> S 触发按钮 <---
const loading = ref(false)
const triggerClick = () => {
  loading.value = true
  const { task } = props
  const taskValue = unref(task)
  taskValue(() => {
    loading.value = false
  }, props.values)
}
// ---> E 触发按钮 <---

// ---> S 模式 <---

const typeGet = computed(() => {
  const { mode = '', type = '' } = props

  switch (mode) {
    case 'delete':
      return 'danger'
    case 'cancel':
      return ''
    case 'confirm':
      return 'primary'
  }
  return type
})
const iconGet = computed(() => {
  const { mode = '', icon = '' } = props

  switch (mode) {
    case 'delete':
      return Delete
    case 'add':
      return Plus
    case 'cancel':
      return CloseBold
    case 'confirm':
      return Select
  }
  return icon
})
const contentGet = computed(() => {
  const { mode = '', content = '' } = props

  switch (mode) {
    case 'cancel':
      return '取消'
    case 'confirm':
      return '确认'
    case 'add':
      return '新增'
    case 'delete':
      return '删除'
  }
  return content
})

// ---> E 模式 <---
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
        <el-button :type="typeGet" :icon="iconGet" :loading="loading" :plain="plain">{{
          contentGet
        }}</el-button>
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

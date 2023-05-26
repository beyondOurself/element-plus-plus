<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 17:20:40
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 17:44:16
 * @FilePath: \common\src\components\bsgoal-base-switch\index.vue
 * @Description: switch 开关
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'

defineOptions({
  name: 'BsgoalBaseSwitch'
})

const props = defineProps({
  /**
   *  text 配置 选项
   */
  textRange: {
    type: [Array],
    default: () => ['是', '否']
  },
  /**
   * value 配置 选项
   */
  valueRange: {
    type: [Array],
    default: () => ['1', '0']
  },
  /**
   * value
   */
  modelValue: {
    type: [],
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])

/**
 * @Author: canlong.shen
 * @description: 触发 值变化
 * @default:
 * @return {*}
 */
const triggerChange = (value = '') => {
  emits('update:modelValue', value)
}
</script>

<template>
  <div class="bsgoal-base-switch">
    <el-switch
      class="base_switch"
      :model-value="modelValue"
      :active-value="valueRange[0]"
      :inactive-value="valueRange[1]"
      :active-text="textRange[0]"
      :inactive-text="textRange[1]"
      @change="triggerChange"
    />
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

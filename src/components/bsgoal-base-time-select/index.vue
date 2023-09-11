<!--
 * @Author: canlong.shen
 * @Date: 2023-08-19 14:53:08
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-19 15:35:41
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-time-select\index.vue
 * @Description:  时间选择器
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watchEffect } from 'vue'

defineOptions({
  name: 'BsgoalBaseTimeSelect'
})

const props = defineProps({
  /**
   * value
   */
  modelValue: {
    type: [String],
    default: ''
  },
  /**
   * 禁用状态
   */
  disabled: {
    type: [Boolean],
    default: false
  },
  /**
   * 文本框可输入
   */
  editable: {
    type: [Boolean],
    default: false
  },
  /**
   * 是否显示清除按钮
   */
  clearable: {
    type: [Boolean],
    default: false
  },
  /**
   * 非范围选择时的占位内容
   */
  placeholder: {
    type: [String],
    default: ''
  },
  /**
   * 最早时间点，早于该时间的时间段将被禁用
   */
  minTime: {
    type: [String],
    default: ''
  },
  /**
   * 最晚时间点，晚于该时间的时间段将被禁用
   */
  maxTime: {
    type: [String],
    default: ''
  },
  /**
   * 设置时间格式
   */
  format: {
    type: [String],
    default: 'HH:mm'
  },
  /**
   * 开始时间
   */
  start: {
    type: [String],
    default: '00:00'
  },
  /**
   * 结束时间
   */
  end: {
    type: [String],
    default: '23:59'
  }
})

const emits = defineEmits(['update:modelValue'])

const curModelValue = ref('')

watchEffect(() => {
  const { modelValue } = props
  curModelValue.value = modelValue
})

const change = (value = '') => {
  emits('update:modelValue', value)
}

const curStart = ref('')
const curEnd = ref('')

watchEffect(() => {
  const { start = '', end = '' } = props
  curStart.value = start
  curEnd.value = end
})


</script>
<template>
  <div class="bsgoal-base-time-select">
    <el-time-select
      class="base_time_select"
      v-model="curModelValue"
      v-bind="$props"
      :start="curStart"
      :end="curEnd"
      @change="change"
    />
  </div>
</template>
<style lang="scss"></style>

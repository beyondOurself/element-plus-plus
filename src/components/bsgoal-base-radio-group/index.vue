<!--
 * @Author: canlong.shen
 * @Date: 2023-09-05 17:49:42
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-12 17:55:46
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-radio-group\index.vue
 * @Description: 单选框 - 按钮组
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watchEffect, toValue , computed } from 'vue'

defineOptions({
  name: 'BsgoalBaseRadioGroup'
})

const props = defineProps({
  /**
   * value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  /**
   * 可配置项目
   */
  options: {
    type: [Array],
    default: () => []
  },
  /**
   * 不同模式
   */
  mode: {
    type: [String],
    default: 'button',
    validator: (v) => ['button', 'radio'].includes(v)
  },
  /**
   *  禁用
   */
  disabled: {
    type: [Boolean, Array],
    default: false
  }
})

const emits = defineEmits(['update:modelValue', 'on-change'])

const curModelValue = ref('')

watchEffect(() => {
  const { modelValue = '' } = props
  curModelValue.value = modelValue
})

const curOptions = ref([])


watchEffect(() => {
  const { options = [], disabled = false } = props
  if (Array.isArray(disabled)) {
    const optionsValue = toValue(options)
    for (const option of optionsValue) {
      const { value } = option

      if (disabled.includes(value)) {
        option.disabled = true
      } else {
        option.disabled = false
      }
    }
  }
  curOptions.value = options
})


  const disabledGet = computed(() => {

    const { disabled = false } = props

    if(Array.isArray(disabled)){
        return false
    }
    return disabled
  })


const change = (value = '') => {
  emits('on-change', value)
  emits('update:modelValue', value)
}
</script>
<script>
export default {
  name: 'BsgoalBaseRadioGroup'
}
</script>
<template>
  <div class="bsgoal-base-radio-group">
    <el-radio-group
      class="base_radio_group"
      v-model="curModelValue"
      :disabled="disabledGet"
      @change="change"
    >
      <template v-for="(option, index) of curOptions" :key="index">
        <el-radio-button
          v-if="mode === 'button'"
          :label="option.value"
        >
          {{ option.label }}</el-radio-button
        >
        <el-radio v-if="mode === 'radio'" :disabled="!!option.disabled" :label="option.value">
          {{ option.label }}</el-radio
        >
      </template>
    </el-radio-group>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-radio-group {
  display: inline-block;
}
</style>

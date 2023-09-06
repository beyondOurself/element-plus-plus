<!--
 * @Author: canlong.shen
 * @Date: 2023-09-05 17:49:42
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-06 14:03:06
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-radio-group\index.vue
 * @Description: 单选框 - 按钮组
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watchEffect } from 'vue'

defineOptions({
  name: 'BsgoalBaseRadioGroup'
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
   * 可配置项目
   */
  options: {
    type: [Array],
    default: () => []
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
  const { options = [] } = props
  curOptions.value = options
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
    <el-radio-group class="base_radio_group" v-model="curModelValue" @change="change">
      <template v-for="(option, index) of curOptions" :key="index">
        <el-radio-button :label="option.value"> {{ option.label }}</el-radio-button>
      </template>
    </el-radio-group>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-radio-group {
}
</style>

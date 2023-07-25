<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 11:09:59
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-30 17:58:18
 * @FilePath: \common\src\components\bsgoal-base-select\index.vue
 * @Description: Select 公共组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watchEffect } from 'vue'

defineOptions({
  name: 'BsgoalBaseSelect'
})

const props = defineProps({
  /**
   * 占位提示符
   */
  placeholder: {
    type: [String],
    default: '请选择'
  },
  /**
   * 可选范围 { label : '' , value : ''}
   */
  range: {
    type: [Array],
    default: () => []
  },
  /**
   * value
   */
  modelValue: {
    type: [],
    default: ''
  },
  /**
   * 无数据提示
   */
  none: {
    type: [String],
    default: '暂无数据'
  },
  /**
   * 是否可清空
   */
  clearable: {
    type: [Boolean],
    default: false
  },
  /**
   * 是否可搜索
   */
  filterable: {
    type: [Boolean],
    default: false
  }
})

const emits = defineEmits(['update:modelValue', 'change'])

// ---> S 值绑定 <---

const selectValue = ref('')
watchEffect(() => {
  selectValue.value = props.modelValue
})

// ---> E 值绑定 <---

// ---> S 触发 方法 <---

/**
 * @Author: canlong.shen
 * @description: 触发 change
 * @default:
 * @return {*}
 */
const triggerChange = (value = '') => {
  const { range = [] } = props
  const finder = range.find((fi) => fi.value === value)
  const data = finder ? finder.data : null

  emits('update:modelValue', value)
  emits('change', value, data)
}

// ---> E 触发 方法 <---
</script>
<template>
  <div class="bsgoal-base-select">
    <el-select
      class="base_select"
      v-model="selectValue"
      :clearable="clearable"
      :filterable="filterable"
      :no-data-text="none"
      :placeholder="placeholder"
      @change="triggerChange"
    >
      <template v-for="({ label = '', value = '' }, key) of range" :key="key">
        <el-option :label="label" :value="value"></el-option>
      </template>
    </el-select>
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

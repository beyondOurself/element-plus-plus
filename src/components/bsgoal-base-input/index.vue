<!--
 * @Author: canlong.shen
 * @Date: 2023-05-29 09:38:52
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-11 10:20:33
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-input\index.vue
 * @Description:  Input 输入框
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watch, watchEffect, useSlots ,computed} from 'vue'

defineOptions({
  name: 'BsgoalBaseInput'
})

const props = defineProps({
  /**
   * value
   */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /**
   * placeholder
   */
  placeholder: {
    type: [String],
    default: '请输入'
  },
  /**
   * 禁用状态
   */
  disabled: {
    type: [Boolean],
    default: false
  },
  /**
   * 输入值格式
   */
  formatter: {
    type: [Function],
    default: () => {
      return (v) => v
    }
  },
  /**
   * 提取值
   */
  parser: {
    type: [Function],
    default: () => {
      return (v) => v
    }
  },
  /**
   * 显示清楚按钮
   */
  clearable: {
    type: [Boolean],
    default: true
  },
  /**
   * 输入框
   */
  type: {
    type: [String],
    default: 'text'
  },
  /**
   * 是否为 数字输入框
   */
  isNumber: {
    type: [Boolean],
    default: false
  }
})

const emits = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

// ---> S 值绑定 <---

const inputValue = ref('')

watchEffect(() => {
  inputValue.value = props.modelValue
})

// ---> E 值绑定 <---

// ---> S 事件  <---

/**
 * @Author: canlong.shen
 * @description: 触发 变动输入
 * @default:
 * @return {*}
 */
const change = (value = '') => {
  emits('change', value)
  emits('update:modelValue', value)
}
/**
 * @Author: canlong.shen
 * @description: 触发 清空输入
 * @default:
 * @return {*}
 */
const clear = (value = '') => {
  emits('clear', value)
  emits('update:modelValue', value)
}
/**
 * @Author: canlong.shen
 * @description: 触发 输入事件
 * @default:
 * @return {*}
 */
const input = (value = '') => {
  emits('input', value)
  emits('update:modelValue', value)
}

/**
 * @Author: canlong.shen
 * @description: 当选择器的输入框失去焦点时触发
 * @param {*} value
 * @default:
 * @return {*}
 */
const blur = (value = '') => {
  emits('input', value)
}

/**
 * @Author: canlong.shen
 * @description: 当选择器的输入框失去焦点时触发
 * @param {*} value
 * @default:
 * @return {*}
 */
const focus = (value = '') => {
  emits('focus', value)
}

// ---> E 事件  <---

// ---> S 插槽 <---
const slots = useSlots()
const slotNames = ref(Object.keys(slots))
// ---> E 插槽 <---

// ---> S 类型 <---
const typeGet = computed(() => {
  const { type = '', isNumber = false } = props

  if (isNumber) {
    return 'number'
  }

  return type
})
// ---> E 类型 <---
</script>

<template>
  <div class="bsgoal-base-input">
    <el-input
      v-model="inputValue"
      class="base_input"
      :type="typeGet"
      :clearable="clearable"
      :placeholder="placeholder"
      :disabled="disabled"
      :formatter="formatter"
      :parser="parser"
      @change="change"
      @clear="clear"
      @input="input"
      @blur="blur"
      @focus="focus"
    >
      <!-- S 输入框头部内容 -->
      <template #[slotName] v-for="slotName of slotNames">
        <slot :name="slotName"></slot>
      </template>
    </el-input>
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

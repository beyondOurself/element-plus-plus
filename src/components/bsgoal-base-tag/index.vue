<!--
 * @Author: canlong.shen
 * @Date: 2023-10-07 18:05:10
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-08 09:49:55
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-tag\index.vue
 * @Description: 标签
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, toValue, toRaw, watchEffect } from 'vue'
defineOptions({
  name: 'BsgoalBaseTag'
})
const props = defineProps({
  /**
   * 标签
   */
  label: {
    type: [String],
    default: ''
  },
  /**
   * 类型
   */
  type: {
    type: [String],
    default: 'info',
    validator: (v) => ['success', 'info', 'warning', 'danger'].includes(v)
  },
  /**
   * 是否可移除
   */
  closable: {
    type: [Boolean],
    default: false
  },
  /**
   * 是否为圆形
   */
  round: {
    type: [Boolean],
    default: false
  },
  /**
   * 配置项
   */
  options: {
    type: [Array],
    default: () => []
  }
})

const emits = defineEmits(['on-click', 'on-close', 'on-change'])

const isCheckTagGet = computed(() => {
  const { options = [] } = props
  return !!options.length
})

const onChange = () => {}
const onClick = () => {
  emits('on-click')
}
const onClose = () => {
  emits('on-close')
}
const triggerChange = () => {
  const checkedOptionList = curOptions.value.filter((fi) => fi.checked)
  const checkedValueList = checkedOptionList.map(mi => mi.value)
  emits('on-change', checkedValueList, checkedOptionList)
}
const curOptions = ref([])
watchEffect(() => {
  curOptions.value = props.options
  triggerChange()
})

const handleCheckTag = (key = false, option = {}) => {
  emits('on-click', option, key)
}
</script>
<template>
  <div class="bsgoal-base-tag">
    {{ values }}
    <template v-if="isCheckTagGet">
      {{ curOptions }}
      <template v-for="(option, key) of curOptions" :key="key">
        <el-check-tag
          v-model:checked="option.checked"
          @change="onChange"
          @click="handleCheckTag(key, option)"
        >
          {{ option.label }}</el-check-tag
        >
      </template>
    </template>
    <template v-else>
      <el-tag v-bind="$props" class="base_tag" effect="light" @click="onClick" @close="onClose">
        <slot>{{ label }}</slot>
      </el-tag>
    </template>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-tag {
  display: inline-block;
}
</style>

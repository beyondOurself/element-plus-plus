<!--
 * @Author: canlong.shen
 * @Date: 2023-08-26 15:30:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-28 17:01:43
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-cascader-multiple\index.vue
 * @Description:  级联选择器 - 多选
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, toValue, watchEffect, computed } from 'vue'

defineOptions({
  name: 'BsgoalBaseCascaderMultipl'
})

const props = defineProps({
  /**
   * value
   */
  modelValue: {
    type: [Array],
    default: () => []
  },
  /**
   * 显示最大tag数量
   */
  max: {
    type: [Number],
    default: 1
  },
  /**
   * 选项的数据源
   */
  options: {
    type: [Array],
    default: () => []
  },

  /**
   * root 是否只读
   */
  rootDisabled: {
    type: [Boolean],
    default: false
  },
  /**
   *仅显示最后一级
   */
  showAllLevels: {
    type: [Boolean],
    default: true
  },
  /**
   * 映射props
   */
  propsMap: {
    type: [Object],
    default: () => ({ multiple: true, checkStrictly: true })
  }
})

const emits = defineEmits(['update:modelValue', 'on-change'])

const curModelValue = ref([])

watchEffect(() => {
  const { modelValue = [] } = props

  curModelValue.value = toValue(modelValue)
})

const optionsGet = computed(() => {
  const { options = [], rootDisabled = false } = props

  if (rootDisabled) {
    return options.map((mi) => {
      mi.disabled = true
      return mi
    })
  }

  return options
})

const styleGet = computed(() => {
  const styler = {}

  return styler
})

const change = (value = []) => {
  emits('on-change', value)
  emits('update:modelValue', value)
}
</script>
<template>
  <div class="bsgoal-base-cascader-multipl">
    <el-cascader
      class="base_cascader_multipl"
      v-model="curModelValue"
      filterable
      clearable
      collapse-tags
      collapse-tags-tooltip
      :show-all-levels="showAllLevels"
      :style="styleGet"
      :max-collapse-tags="max"
      :options="optionsGet"
      :props="propsMap"
      @change="change"
    >
    </el-cascader>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-cascader-multipl {
  width: 100%;
  .base_cascader_multipl {
    width: inherit;
  }
}
</style>

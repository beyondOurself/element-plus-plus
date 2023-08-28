<!--
 * @Author: canlong.shen
 * @Date: 2023-08-26 15:30:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-26 16:12:27
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
  }
})

const emits = defineEmits(['update:modelValue', 'on-change'])

const curModelValue = ref([])

watchEffect(() => {
  const { modelValue = [] } = props
  curModelValue.value = toValue(modelValue)
})

const optionsGet = computed(() => {
  const { options = [] } = props

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
      :style="styleGet"
      :max-collapse-tags="1"
      :options="max"
      :props="{ multiple: true, checkStrictly: true }"
      @change="change"
    >
    </el-cascader>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-cascader-multipl {
    .base_cascader_multipl {
        width: 100%;
    }
}
</style>

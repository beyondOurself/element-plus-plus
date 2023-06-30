<!--
 * @Author: canlong.shen
 * @Date: 2023-04-25 15:29:27
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-26 18:18:02
 * @FilePath: \common\src\components\bsgoal-base-cascader\index.vue
 * @Description: 级联选择 公共组件
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, toRaw } from 'vue'

defineOptions({
  name: 'BsgoalBaseCascader'
})

const props = defineProps({
  /**
   * 绑定的值
   */
  modelValue: {
    type: [Array],
    default: () => []
  },
  /**
   * 数据
   * {
   *  value: '',
   *  label: '',
   *  children: [
   *
   *   ]
   *  }
   */
  dataOptions: {
    type: [Array],
    default: () => []
  },
  /**
   * placeholder 输入框占位文本
   */
  placeholder: {
    type: [String],
    default: ''
  }
})

const emits = defineEmits(['update:model-value', 'on-change'])

const configProps = ref({
  checkStrictly: true,
  multiple: false
})

/**
 * @Author: canlong.shen
 * @description: 触发选择
 * @param {*} val
 * @default:
 * @return {*}
 */
const changeCascaderValue = (val) => {
  emits('update:model-value', val)
  emits('on-change', val)
}
</script>
<template>
  <div class="bsgoal-base-cascader">
    <el-cascader
      clearable
      class="base_cascader"
      :show-all-levels="false"
      :model-value="modelValue"
      :options="dataOptions"
      :props="configProps"
      :placeholder="placeholder"
      @change="changeCascaderValue"
    />
  </div>
</template>

<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-cascader {
  height: 100%;
  width: 100%;
  .base_cascader {
    width: inherit;
    height: inherit;
  }
}
</style>

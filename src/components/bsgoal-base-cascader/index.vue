<!--
 * @Author: canlong.shen
 * @Date: 2023-04-25 15:29:27
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-14 15:06:31
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-cascader\index.vue
 * @Description: 级联选择 公共组件
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, toRaw, computed } from 'vue'

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
  },
  /**
   * 取消父子节点广联
   */
  checkStrictly: {
    type: [Boolean],
    default: true
  }
})

const emits = defineEmits(['update:model-value', 'on-change'])

const configPropsGet = computed(() => {
  const { checkStrictly = true } = props
  const configProps = {
    checkStrictly,
    multiple: false
  }

  return configProps
})

/**
 * @Author: canlong.shen
 * @description: 触发选择
 * @param {*} val
 * @default:
 * @return {*}
 */
const EL_CASCADER_REF = ref(null)
const changeCascaderValue = (val) => {
  const nodes = EL_CASCADER_REF.value.getCheckedNodes()
  const options = nodes.map((mi) => mi.data)
  const data = options.map(({ data = {} }) => data)
  emits('update:model-value', val)
  emits('on-change', val, data, options, nodes)
}
</script>
<template>
  <div class="bsgoal-base-cascader">
    <el-cascader
      filterable
      clearable
      class="base_cascader"
      ref="EL_CASCADER_REF"
      :show-all-levels="false"
      :model-value="modelValue"
      :options="dataOptions"
      :props="configPropsGet"
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

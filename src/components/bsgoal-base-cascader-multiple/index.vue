<!--
 * @Author: canlong.shen
 * @Date: 2023-08-26 15:30:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-12 15:35:30
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-cascader-multiple\index.vue
 * @Description:  级联选择器 - 多选
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { checkboxGroupContextKey } from 'element-plus'
import { ref, toValue, watchEffect, computed } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

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
   * 是否禁用
   */
  disabled: {
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
  },
  /**
   * 是否懒加载
   */
  lazy: {
    type: [Boolean],
    default: false
  },

  /**
   * 懒加载方法
   */
  lazyLoad: {
    type: [Function],
    default: () => {}
  },

  /**
   * 初始加载
   */
  initLoad: {
    type: [Function],
    default: () => {}
  },

  /**
   * 懒加载开始层级
   */
  startLevel: {
    type: [Number],
    default: 0
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

const propsMapGet = computed(() => {
  const {
    propsMap = {},
    lazy = false,
    options = [],
    lazyLoad = () => {},
    initLoad = () => {}
  } = props
  const lazyLoadHook = (node, resolve) => {
    const { level } = node
    if (level === 0) {
      const optionsValue = toValue(options)
      if (optionsValue && optionsValue.length) {
        resolve([])
      } else {
        initLoad(node, resolve)
      }
    } else {
      lazyLoad(node, resolve, level)
    }
  }
  return { ...propsMap, lazy, lazyLoad: lazyLoadHook }
})

const curDisabled = ref(false)

watchEffect(() => {
  const { disabled = false } = props
  curDisabled.value = disabled
})
</script>
<template>
  <div class="bsgoal-base-cascader-multipl">

    <el-config-provider :locale="zhCn">
      <el-cascader
        class="base_cascader_multipl"
        v-model="curModelValue"
        filterable
        clearable
        collapse-tags
        collapse-tags-tooltip
        :disabled="curDisabled"
        :show-all-levels="showAllLevels"
        :style="styleGet"
        :max-collapse-tags="max"
        :options="optionsGet"
        :props="propsMapGet"
        @change="change"
      >
      </el-cascader>
    </el-config-provider>
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

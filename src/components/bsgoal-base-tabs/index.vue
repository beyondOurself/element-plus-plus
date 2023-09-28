<!--
 * @Author: canlong.shen
 * @Date: 2023-04-28 16:01:06
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-27 11:37:10
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-tabs\index.vue
 * @Description: tabs 标签页公共组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, unref, computed } from 'vue'

defineOptions({
  name: 'BsgoalBaseTabs'
})

const props = defineProps({
  /**
   * 配置项
   *  [
   *   {
   *     label: '' // 对应 label值
   *     value: '' // 对应 name值
   *   }
   *  ]
   */
  configOptions: {
    type: [Array],
    default: () => []
  },
  /**
   * 风格
   * card : 卡片风格
   * border-card : 带有边框的卡片风格
   */
  type: {
    type: [String],
    default: '',
    validator: (v) => ['card', 'border-card', ''].includes(v)
  },
  /**
   * 组件绑定的值
   */
  modelValue: {
    type: [String],
    default: ''
  },
  /**
   * 是否自动撑开
   */
  stretch: {
    type: [Boolean],
    default: false
  },
  /**
   * fill 自动填满高度
   */
  fill: {
    type: [Boolean],
    default: false
  }
})

const emits = defineEmits(['update:modelValue','on-change'])

// ---> S modelValue Get <---
const modelValueGet = computed(() => {
  const { modelValue = '', configOptions = [] } = props
  const nameList = unref(configOptions).map((mi) => mi.value)
  const actionName = unref(modelValue)
  return actionName || nameList[0]
})
// ---> E modelValue Get <---

// ---> S tab的切换 <---
const activeTab = ref(modelValueGet.value)
const changeTab = (activeValue = '') => {
  activeTab.value = activeValue
  emits('on-change', activeValue)
  emits('update:modelValue', activeValue)
}
// ---> E tab的切换 <---
</script>
<template>
  <div class="bsgoal-base-tabs">
    <el-tabs
      class="base_tabs"
      :class="{
        'base_tabs--fill': fill
      }"
      :stretch="stretch"
      :type="type"
      :model-value="modelValueGet"
      @tab-change="changeTab"
    >
      <template v-for="({ label, value }, key) of configOptions" :key="key">
        <el-tab-pane :label="label" :name="value">
          <slot :name="value" v-if="activeTab === value">{{ label }}</slot>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-tabs {
  .base_tabs--fill {
    position: absolute;
    top: 8px;
    bottom: 0;
    left: 16px;
    right: 16px;
    display: flex;
    flex-direction: column;
    & > div.el-tabs__content {
      flex: 1;
      position: relative;
    }
  }
}
</style>

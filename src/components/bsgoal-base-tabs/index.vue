<!--
 * @Author: canlong.shen
 * @Date: 2023-04-28 16:01:06
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-28 16:39:10
 * @FilePath: \common\src\components\bsgoal-base-tabs\index.vue
 * @Description: tabs 标签页公共组件
 * 
-->

<script>
export default {
  name: 'BsgoalBaseTabs'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
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
    validator: (v) => ['card', 'border-card'].includes(v)
  },
  /**
   * 组件绑定的值
   */
  modelValue: {
    type: [String],
    default: ''
  }
})


/**
 *  update:modelValue  // 更新 modelValue 的方法
 */
const emits = defineEmits(['update:modelValue'])

// ---> S tab的切换 <---
const changeTab = (activeValue = '') => {
  emits('update:modelValue', activeValue)
}
// ---> E tab的切换 <---
</script>
<template>
  <div class="bsgoal-base-tabs">
    <el-tabs
      stretch
      class="bsgoal_base_tabs"
      :type="type"
      :model-value="modelValue"
      @tab-change="changeTab"
    >
      <template v-for="({ label, value }, key) of configOptions" :key="key">
        <el-tab-pane :label="label" :name="value">
          <slot :name="value">{{ label }}</slot>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>
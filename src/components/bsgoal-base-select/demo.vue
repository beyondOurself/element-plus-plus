<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 11:10:09
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-11 09:18:45
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-select\demo.vue
 * @Description: select  演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseSelect from './index.vue'

defineOptions({
  name: 'BsgoalBaseSelectDemo'
})

const props = defineProps({})

const selectValue = ref('11')
const selectRange = ref([
  {
    label: '11',
    value: '11',
    data: { prop1: 'prop1', prop2: 'prop2' }
  },
  {
    label: '22',
    value: '22'
  },
  {
    label: '33',
    value: '33'
  }
])

/**
 * @Author: canlong.shen
 * @description: 触发 值变动
 * @default:
 * @return {*}
 */
const change = (value = '', data = {}) => {
  console.log('value', value)
  console.log('data', data)
}

const test = (params = '') => {
   selectValue.value = ''
}
</script>
<template>
  <div class="bsgoal-base-select-demo">
    <div class="base_select_demo">
      {{ selectValue }}
      <BsgoalBaseSelect :model-value="selectValue" :range="selectRange" @change="change" />
      <el-button type="primary" @click="test">test</el-button>
    </div>
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

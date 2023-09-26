<!--
 * @Author: canlong.shen
 * @Date: 2023-09-22 17:51:36
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-26 09:46:10
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-list\demo.vue
 * @Description:  列表组件 - 演示
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseList from './index.vue'
import ComponentTypeEnums from '../../enums/componentTypeEnums.js'

defineOptions({
  name: 'BsgoalBaseListDemo'
})
const props = defineProps({})

const options = ref([
  {
    label: 'prop1',
    prop: 'prop1',
    type: ComponentTypeEnums.INPUT,
    placeholder: ''
  },
  {
    label: 'prop2',
    prop: 'prop2',
    type: ComponentTypeEnums.SELECT,
    range: [
      {
        label: 'label1',
        value: 'Value1'
      }
    ],
    placeholder: ''
  }
])

const row = new Array(40).fill(1)
const fetch = (params = {}) => {
  console.log('params', params)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          rows: row,
          total: 3
        }
      })
    }, 1000)
  })
}
</script>
<template>
  <div class="bsgoal-base-list-demo">
    <BsgoalBaseList :config-options="options" :fetch="fetch">
      <template #item="{ data }">
        <div style="background-color: red; height: 100px; width: 100%">{{ data }}</div>
      </template>
    </BsgoalBaseList>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-list-demo {
  .list_item {
    height: 100px;
    background-color: red;
  }
}
</style>

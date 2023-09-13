<!--
 * @Author: canlong.shen
 * @Date: 2023-08-26 15:31:04
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-13 10:42:15
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-cascader-multiple\demo.vue
 * @Description:  级联多选
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseCascaderMultipl from './index.vue'
defineOptions({
  name: 'BsgoalBaseCascderultipleDemo'
})

const props = defineProps({})

const options = ref([
  {
    value: 1,
    label: 'Asia',
    children: [],
    data: {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: 'prop3'
    }
  },
  {
    value: 14,
    label: 'Europe',
    children: [
      {
        value: 15,
        label: 'France',
        children: [
          { value: 16, label: 'Paris' },
          { value: 17, label: 'Marseille' },
          { value: 18, label: 'Lyon' }
        ]
      },
      {
        value: 19,
        label: 'UK',
        children: [
          { value: 20, label: 'London' },
          { value: 21, label: 'Birmingham' },
          { value: 22, label: 'Manchester' }
        ]
      }
    ]
  },
  {
    value: 23,
    label: 'North America',
    children: [
      {
        value: 24,
        label: 'US',
        children: [
          { value: 25, label: 'New York' },
          { value: 26, label: 'Los Angeles' },
          { value: 27, label: 'Washington' }
        ]
      },
      {
        value: 28,
        label: 'Canada',
        children: [
          { value: 29, label: 'Toronto' },
          { value: 30, label: 'Montreal' },
          { value: 31, label: 'Ottawa' }
        ]
      }
    ]
  }
])

const data = ref([])

const lazyLoad = (node, resolve, level = 0) => {
  const { value = 0, label = '' } = node

  console.log('level', level)

  if (level === 1) {
    setTimeout(() => {
      resolve([
        {
          value: 28,
          label: 'Canada',
          leaf: true
        }
      ])
    }, 3000)
  }
}

const initLoad = (node, resolve) => {
  setTimeout(() => {
    resolve(options.value)
  }, 3000)
}

const changeCascader = (value, data, options, nodes) => {
  console.log('value', value)
  console.log('data', data)
  console.log('options', options)
  console.log('nodes', nodes)
}
</script>
<template>
  <div class="bsgoal-base-cascader-multiple-demo">
    <div class="base_cascader_multiple_demo">
      {{ data }}
      <!-- S 单选 -->
      <BsgoalBaseCascaderMultipl
        v-model="data"
        :options="options"
        @on-change="changeCascader"
      ></BsgoalBaseCascaderMultipl>
      <!-- E 单选 -->
      <!-- S 多选 -->
      <BsgoalBaseCascaderMultipl
        v-model="data"
        lazy
        rootDisabled
        :lazyLoad="lazyLoad"
        :initLoad="initLoad"
      ></BsgoalBaseCascaderMultipl>
      <!-- E 多选 -->
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

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-13 09:38:19
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-21 14:23:18
 * @FilePath: \common\src\components\bsgoal-base-search\demo.vue
 * @Description: 表格查询组件演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseSearch from './index.vue'
import ComponentTypeEnums from '../../enums/componentTypeEnums.js'

defineOptions({
  name: 'BsgoalBaseSearchDemo'
})
// props
const props = defineProps({})
const searchModelValue = ref({})
let curLocalOptions = ref([
  {
    label: 'prop1',
    value: '111',
    prop: 'prop1',
    type: ComponentTypeEnums.INPUT
  },
  {
    label: 'prop2',
    value: 'select2',
    type: ComponentTypeEnums.SELECT,
    prop: 'prop2',
    range: [
      {
        label: 'select1',
        value: 'select1'
      },
      {
        label: 'select2',
        value: 'select2'
      },
      {
        label: 'select3',
        value: 'select3'
      },
      {
        label: 'select4',
        value: 'select5'
      }
    ]
  },
  {
    label: 'prop3',
    value: '111',
    type: ComponentTypeEnums.SLIDER,
    prop: 'prop3'
  },
  {
    label: 'prop4',
    // value: '111',
    type: ComponentTypeEnums.SWITCH,
    prop: 'prop4'
  },
  {
    label: 'prop5',
    // value: '111',
    type: ComponentTypeEnums.RADIO,
    prop: 'prop5',
    range: [
      {
        label: 'radio1',
        value: 'radio1'
      },
      {
        label: 'radio2',
        value: 'radio2'
      }
    ]
  },
  {
    label: 'prop6',
    value: [],
    type: ComponentTypeEnums.CHECKBOX,
    prop: 'prop6',
    range: [
      {
        label: 'checkbox1',
        value: 'checkbox1'
      },
      {
        label: 'checkbox2',
        value: 'checkbox2'
      }
    ]
  },
  {
    label: 'prop7',
    // value: '111',
    type: ComponentTypeEnums.DATE,
    prop: 'prop7',
    format: 'YYYY-MM-DD'
  },
  // {
  //     label: 'prop8',
  //     // value: '111',
  //     type: ComponentTypeEnums.WEEK,
  //     prop: 'prop8'

  // },
  {
    label: 'prop9',
    // value: '111',
    type: ComponentTypeEnums.MONTH,
    prop: 'prop9'
  },
  {
    label: 'prop10',
    // value: '111',
    type: ComponentTypeEnums.YEAR,
    prop: 'prop10'
  },
  {
    label: 'prop11',
    // value: '111',
    type: ComponentTypeEnums.DATE_RANGE,
    prop: 'prop11',
    range: ['startDate', 'endDate']
  },
  {
    label: 'prop12',
    // value: '111',
    type: ComponentTypeEnums.MONTH_RANGE,
    prop: 'prop12'
  },
  {
    label: 'prop13',
    // value: '111',
    type: ComponentTypeEnums.TIME,
    prop: 'prop13'
  },
  {
    label: 'prop14',
    // value: '111',
    type: ComponentTypeEnums.TIME_RANGE,
    prop: 'prop14'
  },
  {
    label: 'prop15',
    // value: '111',
    type: ComponentTypeEnums.DATE_TIME,
    prop: 'prop15'
  },
  {
    label: 'prop16',
    // value: '111',
    type: ComponentTypeEnums.DATE_TIME_RANGE,
    prop: 'prop16'
  },
  {
    label: 'prop17',
    type: ComponentTypeEnums.CASCADER,
    prop: 'prop17',
    single: true,
    range: [
      {
        label: 'value1',
        value: 'value1',
        children: [
          {
            label: 'value1-1',
            value: 'value1-1'
          },
          {
            label: 'value1-2',
            value: 'value1-2'
          },
          {
            label: 'value1-3',
            value: 'value1-3'
          },
          {
            label: 'value1-4',
            value: 'value1-5'
          }
        ]
      }
    ]
  }
])
const test = () => {
  curLocalOptions.value = [111]
}

const curInputModel = ref({
  prop: '1'
})
</script>
<template>
  <div class="bsgoal-base-search_demo">
    {{ searchModelValue }}
    <BsgoalBaseSearch :config-options="curLocalOptions" v-model="searchModelValue" />
    <el-button @click="test">点击按钮</el-button>
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

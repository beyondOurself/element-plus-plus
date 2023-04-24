<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 15:00:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-20 17:47:40
 * @FilePath: \common\src\components\bsgoal-base-form\demo.vue
 * @Description: 表单公共组件演示组件
 * 
-->

<template>
  <div class="bsgoal-base-form-demo">
    <BsgoalBaseForm ref="BSGOAL_BASE_FORM_REF" :config-options="configOptions" :values="values" />
    <el-button type="primary" @click="confirm">提交</el-button>
  </div>
</template>
<script>
export default {
  name: 'BsgoalBaseFormDemo'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import BsgoalBaseForm from './index.vue'
import { ref, computed, toRefs, watch, unref } from 'vue'
import EnumType from '../../enums/enumType.js'

const values = ref({
   prop1:'6666'
})

const BSGOAL_BASE_FORM_REF = ref(null)

const confirm =  () => {
    BSGOAL_BASE_FORM_REF.value.validateForm( (res) => {
     
       console.log('res',res);

    } )
  
}

// 配置项
const configOptions = ref([
  {
    label: 'prop1',
    // value: '111',
    prop: 'prop1',
    type: EnumType.INPUT,
    width: '100px',
    rules:true
  },
  {
    label: 'prop2',
    value: 'select2',
    type: EnumType.SELECT,
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
    // value: '111',
    type: EnumType.SLIDER,
    prop: 'prop3'
  },
  {
    label: 'prop4',
    // value: '111',
    type: EnumType.SWITCH,
    prop: 'prop4'
  },
  {
    label: 'prop5',
    // value: '111',
    type: EnumType.RADIO,
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
    type: EnumType.CHECKBOX,
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
    type: EnumType.DATE,
    prop: 'prop7',
    format: 'YYYY-MM-DD'
  },
  {
    label: 'prop9',
    // value: '111',
    type: EnumType.MONTH,
    prop: 'prop9'
  },
  {
    label: 'prop10',
    // value: '111',
    type: EnumType.YEAR,
    prop: 'prop10'
  },
  {
    label: 'prop11',
    // value: '111',
    type: EnumType.DATE_RANGE,
    prop: 'prop11',
    range: ['startDate', 'endDate']
  },
  {
    label: 'prop12',
    // value: '111',
    type: EnumType.MONTH_RANGE,
    prop: 'prop12'
  },
  {
    label: 'prop13',
    // value: '111',
    type: EnumType.TIME,
    prop: 'prop13'
  },
  {
    label: 'prop14',
    // value: '111',
    type: EnumType.TIME_RANGE,
    prop: 'prop14'
  },
  {
    label: 'prop15',
    // value: '111',
    type: EnumType.DATE_TIME,
    prop: 'prop15'
  },
  {
    label: 'prop16',
    // value: '111',
    type: EnumType.DATE_TIME_RANGE,
    prop: 'prop16'
  }
])
</script>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 15:00:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-31 17:43:54
 * @FilePath: \common\src\components\bsgoal-base-form\demo.vue
 * @Description: 表单公共组件演示组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import BsgoalBaseForm from './index.vue'
import { ref, computed, toRefs, watch, unref } from 'vue'
import ComponentTypeEnums from '../../enums/componentTypeEnums.js'

defineOptions({
  name: 'BsgoalBaseFormDemo'
})

const values = ref({
  prop1: '222',
  prop2: 'select1',
  prop20: ''
})

const BSGOAL_BASE_FORM_REF = ref(null)

const confirm = () => {
  BSGOAL_BASE_FORM_REF.value.validateForm((res) => {
    console.log('res', res)
  })
}

const bindModel = ref({ prop1: '111', prop99: 1, prop101: '否', prop102: '0', _prop104: '' })

// 配置项
const configOptions = ref([
  {
    label: 'prop104',
    prop: '_prop104',
    validator: true,
    rules: [
      {
        validator: (rule, value, callback) => {
          console.log('value', value)

          //  return callback(new Error('Please input the age'))
          return callback()
        },
        trigger: 'change'
      }
    ]
  },
  {
    label: 'prop103',
    prop: 'prop103',
    type: ComponentTypeEnums.INPUT,
    formatter: (value = '') => {
      return `${value}`.match(/^\d{1,}$/) ? value : ''
    },
    placeholder: '',
    rules: true
  },

  {
    label: '11',
    prop: 'prop101',
    type: ComponentTypeEnums.CHECKBOX_SINGLE,
    show: { prop102: ['1'] },
    range: [
      {
        value: '是'
      },
      {
        value: '否'
      }
    ]
  },
  {
    type: ComponentTypeEnums.SWITCH,
    label: 'prop102',
    prop: 'prop102',
    range: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  {
    label: 'prop100',
    prop: 'prop100',
    rows: 4,
    length: 1000,
    type: ComponentTypeEnums.INPUT_TEXT_AREA
  },
  {
    label: 'prop99',
    prop: 'prop99',
    value: 0,
    type: ComponentTypeEnums.INPUT_NUMBER,
    max: 'max'
  },
  {
    label: 'prop1',
    // value: '111',
    prop: 'prop1',
    type: ComponentTypeEnums.INPUT,
    width: '100px',
    rules: [],
    readonly: true
  },
  {
    label: 'prop20',
    // value: '111',
    prop: 'prop20',
    type: ComponentTypeEnums.INPUT,
    width: '100px',
    rules: [],
    readonly: true
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
    ],
    readonly: true
  },
  {
    label: 'prop3',
    // value: '111',
    type: ComponentTypeEnums.SLIDER,
    prop: 'prop3'
  },
  {
    label: 'prop4',
    // value: '111',
    type: ComponentTypeEnums.SWITCH,
    prop: 'prop4',
    range: [
      { label: '是', value: 1 },
      { label: '否', value: 0 }
    ]
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
  }
])
</script>
<template>
  <div class="bsgoal-base-form-demo">
    {{ bindModel }}
    <BsgoalBaseForm
      ref="BSGOAL_BASE_FORM_REF"
      readonly
      none="--"
      :itemStyler="{ marginBottom: '8px' }"
      :limits="10"
      :config-options="configOptions"
      :bind-model="bindModel"
    >
      <template #_prop104> 6666 </template>
    </BsgoalBaseForm>
    <el-button type="primary" @click="confirm">提交</el-button>
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

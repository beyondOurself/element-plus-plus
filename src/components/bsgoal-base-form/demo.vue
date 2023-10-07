<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 15:00:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-07 16:09:52
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-form\demo.vue
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
  residentialName: '1111'
})

const BSGOAL_BASE_FORM_REF = ref(null)

const confirm = () => {
  // curConceal.value.push('prop104')
  BSGOAL_BASE_FORM_REF.value.validateForm((res) => {
    console.log('>>>res', res)
  })
}
const resetFields = () => {
  BSGOAL_BASE_FORM_REF.value.resetFields()
}

const bindModel = ref({ prop1: '111', prop99: 1, prop101: '否', prop102: '0', prop104: '888' })

// 配置项
const configOptions = ref([
  // { label: '名称', prop: 'residentialName', limit: 5, readonly: true }

  {
    gap: '设备基础信息'
  },

  {
    label: 'prop105',
    prop: 'prop105',
    value: [],
    attribute: {
      rootDisabled: true,
      checkStrictly: false
    },
    type: ComponentTypeEnums.CASCADER,
    rules: true,
    range: [
      {
        value: 1,
        label: 'Asia',
        children: [
          {
            value: 2,
            label: 'China',
            children: [
              { value: 3, label: 'Beijing' },
              { value: 4, label: 'Shanghai' },
              { value: 5, label: 'Hangzhou' }
            ]
          },
          {
            value: 6,
            label: 'Japan',
            children: [
              { value: 7, label: 'Tokyo' },
              { value: 8, label: 'Osaka' },
              { value: 9, label: 'Kyoto' }
            ]
          },
          {
            value: 10,
            label: 'Korea',
            children: [
              { value: 11, label: 'Seoul' },
              { value: 12, label: 'Busan' },
              { value: 13, label: 'Taegu' }
            ]
          }
        ]
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
    ]
  },

  {
    label: 'prop104',
    prop: 'prop104',
    gap: true
    // readonly: true,
    // rules: [
    //   {
    //     validator: (rule, value, callback) => {
    //       console.log('value', value)

    //       //  return callback(new Error('Please input the age'))
    //       return callback()
    //     },
    //     trigger: 'change'
    //   }
    // ]
  },
  {
    label: 'prop103',
    prop: 'prop103',
    value: '444',
    detail: true,
    type: ComponentTypeEnums.INPUT,
    // formatter: (value = '') => {
    //   return `${value}`.match(/^\d{1,}$/) ? value : ''
    // },
    placeholder: ''
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
    type: ComponentTypeEnums.SELECT,
    prop: 'prop2',
    multiple: true,
    filterable: true,
    attribute: {
      'allow-create': true,
      'default-first-option': true
    },
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
    mode:'button',
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
    prop: 'prop14',
    format:'HH:mm'
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
    prop: 'prop16',
    md: 24
  },
  {
    label: '电话号码',
    // value: '111',
    type: ComponentTypeEnums.INPUT,
    prop: 'prop17',
    md: 24,
    validation: true,
    rules: []
  }
])

const changeFormItem = (values = '') => {
  console.log('values', values)
}

setTimeout(() => {
  const findOption = configOptions.value.find((fi) => fi.prop === 'prop2')
  findOption.range = [
    {
      label: 'select1',
      value: 'select1',
      extra: 'extra1'
    },
    {
      label: 'select2',
      value: 'select2',
      extra: 'extra2'
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
  console.log('configOptions', configOptions.value)
}, 3000)

const curConceal = ref(['prop103'])
</script>
<template>
  <div class="bsgoal-base-form-demo">
    {{ values }}
    <BsgoalBaseForm
      ref="BSGOAL_BASE_FORM_REF"
      readonly
      none="--"
      :conceal="curConceal"
      :medium="6"
      :limits="10"
      :config-options="configOptions"
      :bind-model="values"
      :checkStrictly="false"
      @on-change="changeFormItem"
    >
      <template #prop104> 6666 </template>
    </BsgoalBaseForm>
    <el-button type="primary" @click="confirm">提交</el-button>
    <el-button type="primary" @click="resetFields">重置</el-button>
    <!-- <el-button type="primary" @click="changeValues">改变值</el-button> -->
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

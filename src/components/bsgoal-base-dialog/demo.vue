<!--
 * @Author: canlong.shen
 * @Date: 2023-04-23 16:35:24
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-07-01 09:17:22
 * @FilePath: \common\src\components\bsgoal-base-dialog\demo.vue
 * @Description: 弹窗公共组件 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseDialog from './index.vue'
import BsgoalBaseTabs from '../bsgoal-base-tabs/index.vue'
import BsgoalBaseForm from '../bsgoal-base-form/index.vue'
defineOptions({
  name: 'BsgoalBaseDialogDemo'
})

const props = defineProps({})

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)

const test = () => {
  dialogVisible.value = true
}
const test2 = () => {
  dialogVisible2.value = true
}
const test3 = () => {
  dialogVisible3.value = true
}

const activeTabName = ref('tab1')
const tabsConfigOptions = ref([
  {
    label: 'tab1',
    value: 'tab1'
  },
  {
    label: 'tab2',
    value: 'tab2'
  },
  {
    label: 'tab3',
    value: 'tab3'
  },
  {
    label: 'tab4',
    value: 'tab4'
  }
])

const triggerConfirm = (done) => {
  setTimeout(() => {
    done(false)
  }, 3000)
  console.log('关闭前')
}

const triggerShow = (status = '') => {
  console.log(status, '显示')
}
const triggerHide = (status = '') => {
  console.log(status, '关闭')
}

const bindModel = ref({ prop1: '111', prop99: 1, prop101: '否', prop102: '0', _prop104: '' })

import ComponentTypeEnums from '../../enums/componentTypeEnums.js'

// 配置项
const configOptions = ref([
  // { label: '名称', prop: 'residentialName', limit: 5, readonly: true }

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
    value: [],
    type: ComponentTypeEnums.SELECT,
    prop: 'prop2',
    multiple: true,
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

const values = ref({
  residentialName: '1111'
})
</script>
<template>
  <div class="bsgoal-base-dialog-demo">
    <div class="base_dialog_demo">
      <BsgoalBaseDialog v-model="dialogVisible" width="600" :footer="false">
        <BsgoalBaseTabs v-memo="activeTabName" :config-options="tabsConfigOptions" />
        <template #footer>
          <el-button type="primary">底部按钮</el-button>
        </template>
      </BsgoalBaseDialog>
      <BsgoalBaseDialog
        v-model="dialogVisible2"
        size="max"
        type="blank"
        @on-confirm="triggerConfirm"
        @on-show="triggerShow"
        @on-hide="triggerHide"
      >
        <BsgoalBaseTabs v-memo="activeTabName" :config-options="tabsConfigOptions" />
      </BsgoalBaseDialog>
      <BsgoalBaseDialog
        v-model="dialogVisible3"
        size="medium"
        type="blank"
        @on-confirm="triggerConfirm"
        @on-show="triggerShow"
        @on-hide="triggerHide"
      >
        <div class="bsgoal-base-form-demo">
          <BsgoalBaseForm
            ref="BSGOAL_BASE_FORM_REF"
            readonly
            none="--"
            :limits="10"
            :config-options="configOptions"
            :bind-model="values"
          >
            <template #_prop104> 6666 </template>
          </BsgoalBaseForm>
        </div>
      </BsgoalBaseDialog>
      <el-button type="primary" @click="test">打开弹窗</el-button>
      <el-button type="primary" @click="test2">打开弹窗2</el-button>
      <el-button type="primary" @click="test3">打开弹窗3</el-button>
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

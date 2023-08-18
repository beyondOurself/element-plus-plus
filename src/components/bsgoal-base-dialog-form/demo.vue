<!--
 * @Author: canlong.shen
 * @Date: 2023-08-17 13:52:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-18 15:43:17
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-dialog-form\demo.vue
 * @Description:  弹窗表单 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseDialogForm from './index.vue'
import ComponentTypeEnums from '../../enums/componentTypeEnums.js'

defineOptions({
  name: 'BsgoalBaseDialogFormDemo'
})

const props = defineProps({})

const BSGOAL_BASE_DIALOG_FORM_REF = ref(null)

let formModel = {}

const showDialog1 = () => {
  const model = ref({
    prop1: '111',
    prop2: '112',
    prop3: '113'
  })
  const model1 = BSGOAL_BASE_DIALOG_FORM_REF.value.show(model)
  model1.value.prop1 = '999'
  formModel  = model1
}
const showDialog2 = () => {
  const model = ref({
    prop1: '221',
    prop2: '222',
    prop3: '223'
  })
  BSGOAL_BASE_DIALOG_FORM_REF.value.show(model)
}
const showDialog3 = () => {
  BSGOAL_BASE_DIALOG_FORM_REF.value.show()
}

// ---> S 新增/编辑/详情 <---

const configOptionsForm = ref([
  {
    label: '字段1',
    prop: 'prop1',
    rules: true,
    type: ComponentTypeEnums.INPUT
  },
  {
    label: '字段2',
    prop: 'prop2',
    type: ComponentTypeEnums.INPUT
  },
  {
    label: '字段3',
    prop: 'prop3',
    type: ComponentTypeEnums.INPUT
  }
])

const confirm = (formModel = {}, done = () => {}) => {
  console.log('formModel', formModel)
  done()
}

const test = () => {
  console.log('formModel.value',formModel.value);
  formModel.value.prop1 = '6666'
}

// ---> E 新增/编辑/详情 <---
</script>
<template>
  <div class="bsgoal-base-dialog-form-demo">
    <el-button type="primary" @click="showDialog1">打开弹窗1</el-button>
    <el-button type="primary" @click="showDialog2">打开弹窗2</el-button>
    <el-button type="primary" @click="showDialog3">打开弹窗3</el-button>
    <BsgoalBaseDialogForm
      ref="BSGOAL_BASE_DIALOG_FORM_REF"
      :options="configOptionsForm"
      @on-confirm="confirm"
    >
      <template #prop3>
        <el-button type="primary" @click="test">点击测试</el-button>
      </template>
    </BsgoalBaseDialogForm>
  </div>
</template>
<style lang="scss"></style>

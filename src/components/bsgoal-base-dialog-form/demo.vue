<!--
 * @Author: canlong.shen
 * @Date: 2023-08-17 13:52:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-10 10:50:10
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-dialog-form\demo.vue
 * @Description:  弹窗表单 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { computed, ref, watchEffect } from 'vue'
import BsgoalBaseDialogForm from './index.vue'
import ComponentTypeEnums from '../../enums/componentTypeEnums.js'

defineOptions({
  name: 'BsgoalBaseDialogFormDemo'
})

const props = defineProps({})

const BSGOAL_BASE_DIALOG_FORM_REF = ref(null)

const formModel = ref({})

const showDialog1 = () => {
  const model = ref({
    prop1: '111',
    prop2: '112',
    prop3: '113',
    prop12:'prop12Value'
  })
  const model1 = BSGOAL_BASE_DIALOG_FORM_REF.value.show(model)
  console.log('model1', model1)
  formModel.value = model1
}

const model2 = ref({})
const showDialog2 = () => {
  const model = ref({
    prop1: '221',
    prop2: '222',
    prop3: '223'
  })
  model2.value = BSGOAL_BASE_DIALOG_FORM_REF.value.show(model)
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
    type: ComponentTypeEnums.INPUT,
    fun: () => {
      console.log('666')
    }
  },
  {
    label: '电话号',
    prop: 'prop2',
    validation: true,
    type: ComponentTypeEnums.INPUT
  },
  {
    label: '字段3',
    prop: 'prop3',
    type: ComponentTypeEnums.INPUT
  },
  {
    label: '字段4',
    prop: 'prop4',
    type: ComponentTypeEnums.INPUT
  },
  {
    label: '字段5',
    prop: 'prop5',
    type: ComponentTypeEnums.INPUT,
    display: () => {
      return computed(() => {
        return !!model2.value.prop4
      })
    }
  },
  {
    label: '字段6666',
    prop: 'prop666666',
    type: ComponentTypeEnums.INPUT
  },
  {
    label: '字段7787777777777777',
    prop: 'prop7787777777777777',
    type: ComponentTypeEnums.INPUT
  },

  {
    label: 'prop10',
    prop: 'prop10',
    type: ComponentTypeEnums.TIME_RANGE,
    range: ['prop11', 'prop12']
  }
])

const curConceal = ref(['prop7787777777777777'])

const confirm = (formModel = {}, done = () => {}) => {
  console.log('formModel', formModel)
  done(false)
}

const test = () => {
  console.log('formModel.value', formModel)
  formModel.value.prop1 = '6666'
  curConceal.value = []
}

const changeFormItem = (values = {}) => {
  console.log('values22', values)
}

const hide = () => {
  console.log('隐藏了')
}


watchEffect(() => {
  const { prop11 ,prop12 } = formModel.value
  console.log('prop11~',prop11);
  console.log('prop12~',prop12);
})

// ---> E 新增/编辑/详情 <---
</script>
<template>
  <div class="bsgoal-base-dialog-form-demo">
    {{ formModel }}
    <el-button type="primary" @click="showDialog1">打开弹窗1</el-button>
    <el-button type="primary" @click="showDialog2">打开弹窗2</el-button>
    <el-button type="primary" @click="showDialog3">打开弹窗3</el-button>
    <BsgoalBaseDialogForm
      ref="BSGOAL_BASE_DIALOG_FORM_REF"
      :options="configOptionsForm"
      :conceal="curConceal"
      @on-confirm="confirm"
      @on-change="changeFormItem"
      @on-hide="hide"
    >
      <template #prop3>
        <el-button type="primary" @click="test">点击测试</el-button>
      </template>
      <template #prop2>
        <div>============================ 间隔 =============================</div>
      </template>
    </BsgoalBaseDialogForm>
  </div>
</template>
<style lang="scss"></style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-08-17 13:51:51
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-10 10:48:56
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-dialog-form\index.vue
 * @Description: 弹窗 + 表单
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, toValue, useSlots, toRaw, watchEffect, onUnmounted } from 'vue'
import BsgoalBaseDialog from '../bsgoal-base-dialog/index.vue'
import BsgoalBaseForm from '../bsgoal-base-form/index.vue'
import { deepClone } from '../../utils/common.js'

defineOptions({
  name: 'BsgoalBaseDialogForm'
})

const props = defineProps({
  /**
   * 模式
   */
  mode: {
    type: [String],
    default: 'add',
    validator: (v) => ['add', 'edit', 'detail'].includes(v)
  },
  /**
   * 标题
   */
  title: {
    type: [String],
    default: '标题'
  },
  /**
   * 表单配置
   */
  options: {
    type: [Array],
    default: () => []
  },
  /**
   * 弹窗大小模式
   */
  size: {
    type: [String, Number],
    default: 'medium',
    validator: (v) => ['small', 'medium', 'lagre', 'max', 'dnymic'].includes(v)
  },
  /**
   * 隐藏项
   */
  conceal: {
    type: [Array],
    default: () => []
  },
  /**
   * 弹窗的上边距
   */
  top: {
    type: [String],
    default: '10vh'
  }
})

const emits = defineEmits(['on-confirm', 'on-show', 'on-hide', 'on-change'])

// ---> S 插槽 <---
const slots = useSlots()
const slotNames = ref(Object.keys(slots).filter((fi) => !['footer'].includes(fi)))
// ---> E 插槽 <---

// ---> S 模式 <---

const curMode = ref('')

watchEffect(() => {
  const { mode = '' } = props
  curMode.value = mode
})

// ---> E 模式 <---

// ---> S 表单 <---

const model = ref({})

const configOptionsGet = computed(() => {
  const { options } = props
  return options
})

const disabledGet = computed(() => {
  const mode = toValue(curMode)
  if (mode === 'detail') {
    return true
  }

  return false
})

const changeFormItem = (values = {}) => {
  emits('on-change', values)
}

// ---> E 表单 <---

// ---> S 弹窗 <---
const BSGOAL_BASE_DIALOG_REF = ref(null)

const show = (raw = {}, mode = '') => {
  const cloneRaw = deepClone(toRaw(toValue(raw)))
  const optionsValue = configOptionsGet.value

  optionsValue.forEach((fi) => {
    const { range = [] } = fi
    if (Array.isArray(range) && range.length) {
      for (const prop of range) {
        const { [prop]: propValue = '' } = cloneRaw
        cloneRaw[prop] = propValue
      }
    }
  })

  model.value = deepClone(toRaw(toValue(cloneRaw)))
  if (mode) {
    curMode.value = mode
  } else {
    curMode.value = 'add'
  }

  BSGOAL_BASE_DIALOG_REF.value.show()
  emits('on-show')
  return toValue(model)
}

const hide = () => {
  BSGOAL_BASE_DIALOG_REF.value.hide()
  // emits('on-hide')
}

const hideDialog = () => {
  emits('on-hide')
}

const titleGet = computed(() => {
  const { title = '' } = props
  const mode = toValue(curMode)
  let titlePrefix = ''
  let titleSuffix = ''
  switch (mode) {
    case 'add':
      titlePrefix = '新增'
      break
    case 'edit':
      titlePrefix = '编辑'
      break
    case 'detail':
      titleSuffix = '详情'
      break
    default:
      break
  }

  return `${titlePrefix}${title}${titleSuffix}`
})

const BSGOAL_BASE_FORM_REF = ref(null)

const confirmDialog = (done) => {
  BSGOAL_BASE_FORM_REF.value.validateForm((validaterRes = null) => {
    if (validaterRes) {
      emits('on-confirm', validaterRes, done)
    } else {
      done(false)
    }
  })
}

// ---> E 弹窗 <---

// ---> S 暴露属性  <---
defineExpose({
  show,
  hide
})
// ---> E 暴露属性  <---
</script>
<template>
  <div class="bsgoal-base-dialog-form">
    <BsgoalBaseDialog
      ref="BSGOAL_BASE_DIALOG_REF"
      class="base_dialog_form"
      v-bind="$props"
      :title="titleGet"
      @on-confirm="confirmDialog"
      @on-hide="hideDialog"
    >
      <div>
        <BsgoalBaseForm
          ref="BSGOAL_BASE_FORM_REF"
          v-bind="$props"
          :limits="10"
          :disabled="disabledGet"
          :config-options="configOptionsGet"
          :bind-model="model"
          @on-change="changeFormItem"
        >
          <template #[slotName] v-for="slotName of slotNames">
            <slot :name="slotName"></slot>
          </template>
        </BsgoalBaseForm>
      </div>
      <template #footer>
        <slot name="footer"> </slot>
      </template>
    </BsgoalBaseDialog>
  </div>
</template>
<style lang="scss">
.bsgoal-base-dialog-form {
}
</style>

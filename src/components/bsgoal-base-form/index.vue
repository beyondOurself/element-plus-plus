<!--
 * @Author: canlong.shen
 * @Date: 2023-04-17 11:44:29
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-22 14:18:39
 * @FilePath: \common\src\components\bsgoal-base-form\index.vue
 * @Description:  表单公共组件 
 * 
-->

<script>
export default {
  name: 'BsgoalBaseForm'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, unref, watchEffect } from 'vue'
import EnumType from '../../enums/componentTypeEnums.js'
import baseDirective from '../../directives/directiveBase.js'
import { ElMessage } from 'element-plus'
import BsgoalBaseTooltip from '../bsgoal-base-tooltip/index.vue'
// props
const props = defineProps({
  /**
   * >----------props----------<
   *  {
   *      label:'' //  名称
   *      value:'' //  值
   *      prop:''  //  绑定字段
   *      type:'text'  //  内容组件的类型 : 参照 componentTypeEnums
   *      placeholder:''  // placeholder 提示文本
   *      readonly: false  // 是否为只读文本
   *      clearable:  true  //是否为可清空
   *  }
   *
   * >----------events----------<
   *
   *  on-form  // 触发查询
   *  on-clear   // 触发清空
   *  on-change  // 触发查询变动
   *  on-fold    // 触发折叠
   */
  configOptions: {
    type: [Array],
    default: () => []
  },
  /**
   * 中屏设备宽度的比例
   */
  medium: {
    type: [Number, String],
    default: 24
  },
  /**
   * 初始值
   */
  values: {
    type: [Object],
    default: () => ({})
  },
  /**
   * 全局字数限制
   */
  limits: {
    type: [Number],
    default: 0
  },
  /**
   * 全局只读
   */
  readonlys: {
    type: [Boolean],
    default: false
  },
  /**
   * 空字段 默认值
   */
  none: {
    type: [String],
    default: '无'
  },
  /**
   * 绑定的 mdel
   */
  bindModel: {
    type: [Object],
    default: () => ({})
  }
})

// emits
const emits = defineEmits(['on-form', 'on-clear', 'on-change', 'on-fold'])

// el-from  的引用
const EL_FORM_REF = ref(null)

// 自定义指令
const vAlign = baseDirective.align

const model = ref(props.bindModel)
const watchPropList = []

/**
 * @Author: canlong.shen
 * @description: 绑定的对象
 * @param {*} computed
 * @default:
 * @return {*} model
 */
watchEffect(() => {
  const { configOptions, values } = props
  const options = unref(configOptions)
  const valuesModel = unref(values)
  options.forEach((fei) => {
    const { value = '', prop = '', type = '' } = fei
    if (![EnumType.INPUT, EnumType.INPUT_TEXT_AREA].includes(type)) {
      watchPropList.push(prop)
    }
    const bindValue = unref(model)[prop]
    // console.log(prop,'valuesModel[prop]',bindValue)
    model.value[prop] = bindValue || valuesModel[prop] || value
  })
})

/**
 * @Author: canlong.shen
 * @description: 配置项
 * @param {*} computed
 * @default:
 * @return {*}
 */
const configOptionsGet = computed(() => {
  const { configOptions } = props
  const options = unref(configOptions)
  const reOptions = options.map((option) => {
    let { rules = false, label = '' } = option
    const requiredRule = { required: true, message: `${label}不能为空`, trigger: 'blur' }
    if (rules) {
      if (typeof rules === 'boolean') {
        rules = [requiredRule]
      } else if (Array.isArray(rules)) {
        rules = [requiredRule, ...rules]
      } else {
        rules = [requiredRule, rules]
      }
    }
    option.rules = rules
    return option
  })
  return reOptions
})

/**
 * @Author: canlong.shen
 * @description: 设置 placeholder
 * @param {*} type
 * @param {*} placeholder
 * @default:
 * @return {*}
 */
const placeholderSet = (type = '', label = '', placeholder = '') => {
  if (!placeholder) {
    switch (type) {
      case EnumType.INPUT:
      case EnumType.INPUT_TEXT_AREA:
        return `请输入${label}`
      case EnumType.SELECT:
      case EnumType.DATE:
      case EnumType.WEEK:
      case EnumType.MONTH:
      case EnumType.YEAR:
      case EnumType.DATE_TIME:
      case EnumType.TIME:
        return `请选择${label}`
      case EnumType.DATE_RANGE:
      case EnumType.DATE_TIME_RANGE:
        return ['开始日期', '结束日期']
      case EnumType.TIME_RANGE:
        return ['开始时间', '结束时间']
      case EnumType.MONTH_RANGE:
        return ['开始月份', '结束月份']
      default:
        break
    }
  }

  return placeholder
}

/**
 * @Author: canlong.shen
 * @description: 时间格式
 * @param {*} type
 * @param {*} format
 * @default:
 * @return {*}
 */
const formatSet = (type = '', format = '') => {
  if (!format) {
    switch (type) {
      case EnumType.WEEK:
        return 'ww'
      case EnumType.DATE:
      case EnumType.DATE_RANGE:
        return 'YYYY-MM-DD'
      case EnumType.MONTH:
        return 'MM'
      case EnumType.YEAR:
        return 'YYYY'
      case EnumType.MONTH_RANGE:
        return 'YYYY-MM'
      case EnumType.TIME:
      case EnumType.TIME_RANGE:
        return 'HH:mm:ss'
      case EnumType.DATE_TIME:
      case EnumType.DATE_TIME_RANGE:
        return 'YYYY-MM-DD HH:mm:ss'
      default:
        break
    }
  }

  return format
}

/**
 * @Author: canlong.shen
 * @description: 触发查询
 * @default:
 * @return {*}
 */
const triggerOperationForm = () => {
  const modelValue = unref(model)
  const { configOptions } = props
  const options = unref(configOptions)
  for (const option of options) {
    const { type = '', range = [], prop = '' } = option
    if (type.endsWith('range') && range && range.length === 2) {
      const { 0: startValue = '', 1: endValue = '' } = modelValue[prop]
      const { 0: startProp = '', 1: endProp = '' } = range
      modelValue[startProp] = startValue
      modelValue[endProp] = endValue
    }
  }
  emits('on-form', modelValue)
  return modelValue
}

/**
 * @Author: canlong.shen
 * @description: 触发清空
 * @default:
 * @return {*}
 */
const triggerOperationClear = () => {
  EL_FORM_REF.value.resetFields()
  emits('on-clear', model.value)
}

/**
 * @Author: canlong.shen
 * @description: 触发 值 变化
 * @param {*} type
 * @param {*} prop
 * @default:
 * @return {*}
 */
const triggerValueChange = (type, prop) => {
  // 触发查询
  const emitValue = {
    type,
    prop,
    value: model.value[prop] || ''
  }
  emits('on-change', emitValue)
}

/**
 * @Author: canlong.shen
 * @description: 表单校验
 * @default:
 * @return {*}
 */
const validateForm = (callback = () => {}) => {
  EL_FORM_REF.value.validate((valid = false, field = {}) => {
    if (valid) {
      const validModel = triggerOperationForm()
      callback(validModel)
    } else {
      callback(false)

      const firstProp = Object.keys(field)[0]
      const {
        [firstProp]: {
          0: { message = '' }
        }
      } = field
      ElMessage.error(message)
    }
  })
}

// ---> S switch active/inactive 的设置 <---

/**
 * @Author: canlong.shen
 * @description: 设置 active 值
 * @param {*} range 入参
 * @param {*} type  'active' / 'inactive'
 * @default:
 * @return {*}
 */
const setActiveValueText = (range = [], type = '') => {
  const { 0: startOption = {}, 1: endOption = {} } = range
  const { value: startValue = false, label: startText = '' } = startOption
  const { value: endValue = false, label: endText = '' } = endOption

  switch (type) {
    case 'active-value':
      return startValue
    case 'inactive-value':
      return endValue
    case 'active-text':
      return startText
    case 'inactive-text':
      return endText
    default:
      break
  }
}

// ---> E switch active/inactive 的设置 <---

defineExpose({
  triggerOperationClear,
  triggerOperationForm,
  validateForm
})
</script>
<template>
  <div class="bsgoal-base-form">
    <div class="base_form">
      <!-- / 表单内容 -->
      <el-form ref="EL_FORM_REF" label-suffix=":" :model="model" v-align>
        <el-row>
          <template
            v-for="(
              {
                label = '',
                prop = '',
                type = 'text',
                placeholder = '',
                readonly = readonlys,
                clearable = true,
                rows = 2,
                min = 1,
                max = 10,
                range = [],
                format = '',
                rules = [],
                limit = limits,
                length = 255
              } = {},
              key
            ) of configOptionsGet"
            :key="key"
          >
            <el-col :xs="24" :sm="24" :md="medium">
              <el-form-item :label="label" :prop="prop" :rules="rules">
                <slot :name="[prop]" :option="{ readonly, value: model[prop], values: model }">
                  <!-- S 内容组件 -->
                  <template v-if="!readonly">
                    <!-- / input 输入框组件 -->
                    <template v-if="type === EnumType.INPUT">
                      <el-input
                        v-model="model[prop]"
                        :placeholder="placeholderSet(type, label, placeholder)"
                        :clearable="clearable"
                        @change="triggerValueChange(type, prop)"
                      />
                    </template>
                    <!-- / input 输入框组件 -->
                    <!-- / textarea 输入框组件 -->
                    <template v-if="type === EnumType.INPUT_TEXT_AREA">
                      <el-input
                        v-model="model[prop]"
                        show-word-limit
                        type="textarea"
                        :autosize="{ minRows: rows }"
                        :maxlength="length"
                        :clearable="clearable"
                        :placeholder="placeholderSet(type, label, placeholder)"
                        @change="triggerValueChange(type, prop)"
                      />
                    </template>
                    <!-- / textarea 输入框组件 -->
                    <template v-if="type === EnumType.INPUT_NUMBER">
                      <el-input-number
                        v-model="model[prop]"
                        controls-position="right"
                        :min="min"
                        :max="max"
                        @change="triggerValueChange"
                      />
                    </template>
                    <!-- / 数字输入框 -->

                    <!-- / 单选框 -->
                    <template v-if="type === EnumType.RADIO">
                      <el-radio-group
                        v-model="model[prop]"
                        @change="triggerValueChange(type, prop)"
                      >
                        <template v-for="(item, itemIndex) of range" :key="itemIndex">
                          <el-radio :label="item.value">{{ item.label }}</el-radio>
                        </template>
                      </el-radio-group>
                    </template>
                    <!-- / 单选框 -->
                    <!-- / select 选择器 -->
                    <template v-if="type === EnumType.SELECT">
                      <el-select
                        v-model="model[prop]"
                        :placeholder="placeholderSet(type, label, placeholder)"
                        @change="triggerValueChange(type, prop)"
                      >
                        <template v-for="(item, itemIndex) of range" :key="itemIndex">
                          <el-option :label="item.label" :value="item.value" />
                        </template>
                      </el-select>
                    </template>
                    <!-- / select 选择器 -->
                    <!-- / 滑块 -->
                    <template v-if="type === EnumType.SLIDER">
                      <el-slider
                        v-model="model[prop]"
                        :min="min"
                        :max="max"
                        @change="triggerValueChange(type, prop)"
                      />
                    </template>
                    <!-- / 滑块 -->
                    <!-- / Switch 开关 -->
                    <template v-if="type === EnumType.SWITCH">
                      <el-switch
                        v-model="model[prop]"
                        :active-value="setActiveValueText(range, 'active-value')"
                        :inactive-value="setActiveValueText(range, 'inactive-value')"
                        :active-text="setActiveValueText(range, 'active-text')"
                        :inactive-text="setActiveValueText(range, 'inactive-text')"
                        @change="triggerValueChange(type, prop)"
                      />
                    </template>
                    <!-- / Switch 开关 -->
                    <!-- / 日期选择器 -->
                    <template
                      v-if="
                        [EnumType.DATE, EnumType.MONTH, EnumType.YEAR, EnumType.DATE_TIME].includes(
                          type
                        )
                      "
                    >
                      <el-date-picker
                        v-model="model[prop]"
                        :format="formatSet(type, format)"
                        :value-format="formatSet(type, format)"
                        :type="type"
                        :placeholder="placeholderSet(type, label, placeholder)"
                        @change="triggerValueChange(type, prop)"
                      />
                    </template>
                    <!-- / 日期选择器 -->
                    <!-- / 日期时间区域选择器 -->
                    <template
                      v-if="
                        [
                          EnumType.DATE_RANGE,
                          EnumType.MONTH_RANGE,
                          EnumType.DATE_TIME_RANGE
                        ].includes(type)
                      "
                    >
                      <el-date-picker
                        v-model="model[prop]"
                        :type="type"
                        :value-format="formatSet(type, format)"
                        :start-placeholder="placeholderSet(type, label, placeholder)[0]"
                        :end-placeholder="placeholderSet(type, label, placeholder)[1]"
                        @change="triggerValueChange(type, prop)"
                      />
                    </template>
                    <!-- / 日期时间区域选择器 -->
                    <!-- / 时间选择器 -->
                    <template v-if="[EnumType.TIME].includes(type)">
                      <el-time-picker
                        v-model="model[prop]"
                        arrow-control
                        :value-format="formatSet(type, format)"
                        :placeholder="placeholderSet(type, label, placeholder)"
                        @change="triggerValueChange(type, prop)"
                      />
                    </template>
                    <!-- / 时间选择器 -->
                    <!-- / 时间区域选择器 -->
                    <template v-if="[EnumType.TIME_RANGE].includes(type)">
                      <el-time-picker
                        v-model="model[prop]"
                        is-range
                        :value-format="formatSet(type, format)"
                        :start-placeholder="placeholderSet(type, label, placeholder)[0]"
                        :end-placeholder="placeholderSet(type, label, placeholder)[1]"
                        @change="triggerValueChange(type, prop)"
                      />
                    </template>
                    <!-- / 时间区域选择器 -->
                    <!-- / 复选框 -->
                    <template v-if="[EnumType.CHECKBOX].includes(type)">
                      <el-checkbox-group
                        v-model="model[prop]"
                        @change="triggerValueChange(type, prop)"
                      >
                        <template v-for="(item, itemIndex) of range" :key="itemIndex">
                          <el-checkbox :label="item.value">{{ item.label }}</el-checkbox>
                        </template>
                      </el-checkbox-group>
                    </template>
                    <!-- / 复选框 -->
                    <!-- / 复选框单选 -->
                    <template v-if="[EnumType.CHECKBOX_SINGLE].includes(type)">
                      <el-checkbox
                        v-model="model[prop]"
                        :true-label="range[0] ? range[0].value : '1'"
                        :false-label="range[1] ? range[1].value : '0'"
                        @change="triggerValueChange(type, prop)"
                      />
                    </template>
                    <!-- / 复选框单选 -->
                    <!-- / 模板 -->
                    <template v-if="[].includes(type)"> </template>
                    <!-- / 模板 -->
                  </template>
                  <!-- E 内容组件 -->

                  <!-- S 文本内容 -->
                  <template v-else>
                    <div>
                      <BsgoalBaseTooltip :content="model[prop]" :limit="limit" :none="none" />
                    </div>
                  </template>
                  <!-- E 文本内容 -->
                </slot>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <!-- / 表单内容 -->
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-form {
  .base_form {
    padding: 16px 6px 8px 16px;

    .el-form-item {
      // margin-bottom: 8px;
      margin-right: 10px;
    }

    div.el-input,
    div.el-select {
      width: 100%;
    }
  }
}
</style>

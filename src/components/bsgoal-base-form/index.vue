<!--
 * @Author: canlong.shen
 * @Date: 2023-04-17 11:44:29
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-18 18:27:41
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-form\index.vue
 * @Description:  表单公共组件 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, toValue, watchEffect, watch, onUnmounted, toRaw } from 'vue'
import ComponentTypeEnums from '../../enums/componentTypeEnums.js'
import baseDirective from '../../directives/directiveBase.js'
import BsgoalBaseTooltip from '../bsgoal-base-tooltip/index.vue'
import BsgoalBaseCascaderMultipl from '../bsgoal-base-cascader-multiple/index.vue'
import BsgoalBaseCascader from '../bsgoal-base-cascader/index.vue'
import { ElMessage } from 'element-plus'
import { isObject, deepClone } from '../../utils/common.js'
import { isBoolean } from 'lodash'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

defineOptions({
  name: 'BsgoalBaseForm'
})

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
  },
  /**
   * label 位置
   */
  labelPosition: {
    type: [String],
    default: 'right',
    validator: (v) => ['left', 'rightn', 'top'].includes(v)
  },
  /**
   * base_form  绑定的 style 对象
   */
  styler: {
    type: [Object],
    default: () => ({})
  },
  /**
   * el_form_item  绑定的 style 对象
   */
  itemStyler: {
    type: [Object],
    default: () => ({})
  },

  /**
   * 紧凑型
   */
  compact: {
    type: [Boolean],
    default: false
  },
  /**
   * 失效
   */
  disabled: {
    type: [Boolean],
    default: false
  },
  /**
   * 隐藏项
   */
  conceal: {
    type: [Array],
    default: () => []
  }
})

// emits
const emits = defineEmits(['on-form', 'on-clear', 'on-change', 'on-fold'])

// el-from  的引用
const EL_FORM_REF = ref(null)

// 自定义指令
const vAlign = baseDirective.align

const model = ref()
const watchPropList = []

// ---> S 初始值 <---

watchEffect(() => {
  const { bindModel = {} } = props
  model.value = bindModel
})

/**
 * @Author: canlong.shen
 * @description:
 * @default:
 * @return {*}
 */
const watchPropsForShow = (show = {}, model = {}, prop = '') => {
  // { prop1:[1,2,3] , prop2: [4,5,6] }
  watchEffect(() => {
    const resultList = []
    for (const [name = '', values = []] of Object.entries(show)) {
      resultList.push(values.includes(`${model[name]}`))
    }
    const { configOptions } = props
    const options = toValue(configOptions)
    const findProp = options.find((fi) => fi.prop === prop)
    if (resultList.every((ei) => !!ei)) {
      findProp.visible = true
    } else {
      findProp.visible = false
    }
  })
}

/**
 * @Author: canlong.shen
 * @description: 绑定的对象
 * @param {*} computed
 * @default:
 * @return {*} model
 */
watchEffect(() => {
  const { configOptions, values } = props
  const options = toValue(configOptions)
  const valuesModel = toValue(values)
  options.forEach((fei) => {
    const { value = '', prop = '', type = '', show = null } = fei
    if (![ComponentTypeEnums.INPUT, ComponentTypeEnums.INPUT_TEXT_AREA].includes(type)) {
      watchPropList.push(prop)
    }
    const bindValue = model.value[prop]
    if (prop.startsWith('_')) {
      model.value[prop] = `${prop}`
    } else {
      model.value[prop] = bindValue || valuesModel[prop] || value
    }

    if (isObject(show)) {
      watchPropsForShow(show, toValue(model), prop)
    }
  })
})

// ---> E 初始值 <---

// ---> S 隐藏项 <---

const curConceal = ref([])
watchEffect(() => {
  const { conceal } = props
  curConceal.value = conceal
})
// ---> E 隐藏项 <---

/**
 * @Author: canlong.shen
 * @description: 获取默认校验规则
 * @param {*} label
 * @default:
 * @return {*}
 */
const getValidator = (label = '') => {
  const valiMap = [
    [
      /.*(电话|手机)(号码|号).*/,
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
    ],
    [
      /.*(身份证)(号码|号).*/,
      /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
    ],
    [
      /.*(车牌)(号码|号).*/,
      /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
    ]
  ]

  for (const { 0: labelReg, 1: valueReg } of valiMap) {
    if (labelReg.test(label)) {
      return {
        validator: (rule, value, callback) => {
          if (value && !valueReg.test(value)) {
            callback(new Error(`${label}格式不符合`))
          }
          callback()
        },
        trigger: 'change'
      }
    }
  }

  return null
}

/**
 * @Author: canlong.shen
 * @description: 配置项
 * @param {*} computed
 * @default:
 * @return {*}
 */

const curOptions = ref([])
watch(
  () => props.configOptions,
  () => {
    const { configOptions } = props
    const options = deepClone(toRaw(toValue(configOptions)))
    curOptions.value = options.map((option) => {
      let { rules = [], label = '', prop = '', type = '', validation = false } = option
      const requiredRule = { required: true, message: `${label}不能为空`, trigger: 'blur' }
      const requiredSelectRule = { required: true, message: `${label}不能为空`, trigger: 'change' }
      if (isBoolean(rules) && rules) {
        rules = [
          ComponentTypeEnums.SELECT,
          ComponentTypeEnums.CASCADER_MULTIPLE,
          ComponentTypeEnums.CASCADER
        ].includes(type)
          ? [requiredRule, requiredSelectRule]
          : [requiredRule]
      } else if (Array.isArray(rules) && !!rules.length) {
        rules = [requiredRule, ...rules]
      }
      // 自动新增校验规则
      const validatorRule = getValidator(label)
      if (validatorRule && [ComponentTypeEnums.INPUT].includes(type) && validation) {
        rules = [validatorRule, ...rules]
      }
      option.rules = rules
      return option
    })
  },
  {
    immediate: true,
    deep: true
  }
)

// const configOptionsGet = computed(() => {

//   return reOptions
// })

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
      case ComponentTypeEnums.INPUT:
      case ComponentTypeEnums.INPUT_TEXT_AREA:
        return `请输入${label}`
      case ComponentTypeEnums.SELECT:
      case ComponentTypeEnums.DATE:
      case ComponentTypeEnums.WEEK:
      case ComponentTypeEnums.MONTH:
      case ComponentTypeEnums.YEAR:
      case ComponentTypeEnums.DATE_TIME:
      case ComponentTypeEnums.TIME:
        return `请选择${label}`
      case ComponentTypeEnums.DATE_RANGE:
      case ComponentTypeEnums.DATE_TIME_RANGE:
        return ['开始日期', '结束日期']
      case ComponentTypeEnums.TIME_RANGE:
        return ['开始时间', '结束时间']
      case ComponentTypeEnums.MONTH_RANGE:
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
      case ComponentTypeEnums.WEEK:
        return 'ww'
      case ComponentTypeEnums.DATE:
      case ComponentTypeEnums.DATE_RANGE:
        return 'YYYY-MM-DD'
      case ComponentTypeEnums.MONTH:
        return 'MM'
      case ComponentTypeEnums.YEAR:
        return 'YYYY'
      case ComponentTypeEnums.MONTH_RANGE:
        return 'YYYY-MM'
      case ComponentTypeEnums.TIME:
      case ComponentTypeEnums.TIME_RANGE:
        return 'HH:mm:ss'
      case ComponentTypeEnums.DATE_TIME:
      case ComponentTypeEnums.DATE_TIME_RANGE:
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
  const modelValue = toValue(model)
  const { configOptions } = props
  const options = toValue(configOptions)
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
const triggerValueChange = (type, prop, range = []) => {
  const value = model.value[prop] || ''
  let option = {}

  console.log('range', range)

  if ([ComponentTypeEnums.SELECT].includes(type) && range.length) {
    let hitList = value
    if (!Array.isArray(value)) {
      hitList = [value]
    }
    const filterOptions = range.filter((fi) => hitList.includes(fi.value))
    if (filterOptions.length === 1) {
      option = filterOptions[0]
    } else {
      option = filterOptions
    }
  }

  // 触发查询
  const emitValue = {
    type,
    prop,
    option,
    value
  }
  emits('on-change', emitValue)
}

const changeCascader = (type, prop, values) => {
  const { value = '', data = {}, option = {}, node = {} } = values
  emits('on-change', {
    type,
    prop,
    value,
    data,
    option,
    node
  })
}

/**
 * @Author: canlong.shen
 * @description: 过滤掉插槽字段
 * @default:
 * @return {*}
 */
const filterSlotProps = (model = {}, isParseInt) => {
  const rebuildModel = {}
  for (const prop of Object.keys(model)) {
    if (!prop.startsWith('_')) {
      const value = model[prop]
      if (isParseInt) {
        const valueInt = Number.parseFloat(value)
        rebuildModel[prop] =
          (valueInt || ['0', 0].includes(value)) &&
          !/^0.+/i.test(`${value}`) &&
          /^(\\-|\+)?\d+(\.\d+)?$/i.test(`${value}`) &&
          value.length <= 10
            ? valueInt
            : value
      } else {
        rebuildModel[prop] = value
      }
    }
  }
  return rebuildModel
}

/**
 * @Author: canlong.shen
 * @description: 表单校验
 * @default:
 * @return {*}
 */
const validateForm = (callback = () => {}, isParseInt = true) => {
  EL_FORM_REF.value.validate((valid = false, field = {}) => {
    if (valid) {
      const validModel = triggerOperationForm()
      const cleanModel = filterSlotProps(validModel, isParseInt)
      callback(cleanModel)
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

// ---> S styles <---
const colStyle = computed(() => {
  const styler = {}
  const { compact = false } = props
  if (compact) {
    styler.marginBottom = '0px'
  }
  return styler
})
const itemStyle = computed(() => {
  const styler = {}
  const { compact = false, itemStyler = {} } = props
  if (compact) {
    styler.marginBottom = '0px'
  }

  return { ...styler, ...itemStyler }
})

// ---> E styles <---

defineExpose({
  triggerOperationClear,
  triggerOperationForm,
  validateForm,
  resetFields: triggerOperationClear
})
</script>
<template>
  <div class="bsgoal-base-form">
    <div class="base_form" :style="styler">
      <!-- / 表单内容 -->
      <el-form
        ref="EL_FORM_REF"
        label-suffix=":"
        style="padding: 0px"
        :disabled="disabled"
        :label-position="labelPosition"
        :model="model"
        v-align
      >
        <el-row>
          <template
            v-for="(
              {
                md = 0,
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
                filterable = false,
                length = 255,
                visible = true,
                multiple = false,
                itemDisabled = disabled,
                detail = false,
                attribute = {},
                mode = '',
                gap = false,
                gapStyle = {},
                formatter = (v) => {
                  return v
                },
                parser = (v) => {
                  return v
                }
              } = {},
              key
            ) of curOptions"
            :key="key"
          >
            <el-col
              v-if="!curConceal.includes(prop)"
              :class="{ 'base_form--visible': !visible }"
              :xs="24"
              :sm="24"
              :md="gap ? 24 : md || medium"
              :style="colStyle"
            >
              <template v-if="gap">
                <slot :name="prop || `gap_${key}`">
                  <div class="form_item_gap" :style="gapStyle">
                    <div class="item_gap_line"></div>
                    <div class="item_gap_title">{{ gap }}</div>
                  </div>
                </slot>
              </template>
              <template v-else>
                <el-form-item
                  :style="itemStyle"
                  :class="{ 'bsgoal_base_form_item--disable': detail }"
                  :label="label"
                  :prop="prop"
                  :rules="rules"
                >
                  <slot :name="[prop]" :option="{ readonly, value: model[prop], values: model }">
                    <!-- S 内容组件 -->
                    <template v-if="!readonly && !detail">
                      <el-config-provider :locale="zhCn">
                        <!-- / input 输入框组件 -->
                        <template v-if="type === ComponentTypeEnums.INPUT">
                          <el-input
                            v-model="model[prop]"
                            v-bind="attribute"
                            :disabled="itemDisabled"
                            :placeholder="placeholderSet(type, label, placeholder)"
                            :clearable="clearable"
                            :formatter="formatter"
                            :parser="parser"
                            @change="triggerValueChange(type, prop)"
                          />
                        </template>
                        <!-- / input 输入框组件 -->
                        <!-- / textarea 输入框组件 -->
                        <template v-if="type === ComponentTypeEnums.INPUT_TEXT_AREA">
                          <el-input
                            v-model="model[prop]"
                            show-word-limit
                            type="textarea"
                            v-bind="attribute"
                            :disabled="itemDisabled"
                            :autosize="{ minRows: rows }"
                            :maxlength="length"
                            :clearable="clearable"
                            :placeholder="placeholderSet(type, label, placeholder)"
                            @change="triggerValueChange(type, prop)"
                          />
                        </template>
                        <!-- / textarea 输入框组件 -->
                        <template v-if="type === ComponentTypeEnums.INPUT_NUMBER">
                          <el-input-number
                            v-model="model[prop]"
                            controls-position="right"
                            v-bind="attribute"
                            :disabled="itemDisabled"
                            :min="min"
                            :max="max"
                            @change="triggerValueChange"
                          />
                        </template>
                        <!-- / 数字输入框 -->

                        <!-- / 单选框 -->
                        <template v-if="type === ComponentTypeEnums.RADIO">
                          <el-radio-group
                            v-model="model[prop]"
                            v-bind="attribute"
                            :disabled="itemDisabled"
                            @change="triggerValueChange(type, prop)"
                          >
                            <template v-for="(item, itemIndex) of range" :key="itemIndex">
                              <el-radio v-if="mode === 'button'" :label="item.value">{{
                                item.label
                              }}</el-radio>
                              <el-radio v-else :label="item.value">{{ item.label }}</el-radio>
                            </template>
                          </el-radio-group>
                        </template>
                        <!-- / 单选框 -->
                        <!-- / select 选择器 -->
                        <template v-if="type === ComponentTypeEnums.SELECT">
                          <el-select
                            v-model="model[prop]"
                            v-bind="attribute"

                            no-data-text="暂无数据"
                            :disabled="itemDisabled"
                            :multiple="multiple"
                            :filterable="filterable"
                            :placeholder="placeholderSet(type, label, placeholder)"
                            @change="triggerValueChange(type, prop, range)"
                          >
                            <template v-for="(item, itemIndex) of range" :key="itemIndex">
                              <el-option :label="item.label" :value="item.value" />
                            </template>
                          </el-select>
                        </template>
                        <!-- / select 选择器 -->
                        <!-- / 滑块 -->
                        <template v-if="type === ComponentTypeEnums.SLIDER">
                          <el-slider
                            v-model="model[prop]"
                            v-bind="attribute"

                            :disabled="itemDisabled"
                            :min="min"
                            :max="max"
                            @change="triggerValueChange(type, prop)"
                          />
                        </template>
                        <!-- / 滑块 -->
                        <!-- / Switch 开关 -->
                        <template v-if="type === ComponentTypeEnums.SWITCH">
                          <el-switch
                            v-model="model[prop]"
                            v-bind="attribute"

                            :disabled="itemDisabled"
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
                            [
                              ComponentTypeEnums.DATE,
                              ComponentTypeEnums.MONTH,
                              ComponentTypeEnums.YEAR,
                              ComponentTypeEnums.DATE_TIME
                            ].includes(type)
                          "
                        >
                          <el-date-picker
                            v-model="model[prop]"
                            v-bind="attribute"

                            :disabled="itemDisabled"
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
                              ComponentTypeEnums.DATE_RANGE,
                              ComponentTypeEnums.MONTH_RANGE,
                              ComponentTypeEnums.DATE_TIME_RANGE
                            ].includes(type)
                          "
                        >
                          <el-date-picker
                            v-model="model[prop]"
                            v-bind="attribute"

                            :disabled="itemDisabled"
                            :type="type"
                            :value-format="formatSet(type, format)"
                            :start-placeholder="placeholderSet(type, label, placeholder)[0]"
                            :end-placeholder="placeholderSet(type, label, placeholder)[1]"
                            @change="triggerValueChange(type, prop)"
                          />
                        </template>
                        <!-- / 日期时间区域选择器 -->
                        <!-- / 时间选择器 -->
                        <template v-if="[ComponentTypeEnums.TIME].includes(type)">
                          <el-time-picker
                            v-model="model[prop]"
                            v-bind="attribute"

                            arrow-control
                            :disabled="itemDisabled"
                            :value-format="formatSet(type, format)"
                            :placeholder="placeholderSet(type, label, placeholder)"
                            @change="triggerValueChange(type, prop)"
                          />
                        </template>
                        <!-- / 时间选择器 -->
                        <!-- / 时间区域选择器 -->
                        <template v-if="[ComponentTypeEnums.TIME_RANGE].includes(type)">
                          <el-time-picker
                            v-model="model[prop]"
                            is-range
                            v-bind="attribute"

                            :disabled="itemDisabled"
                            :value-format="formatSet(type, format)"
                            :start-placeholder="placeholderSet(type, label, placeholder)[0]"
                            :end-placeholder="placeholderSet(type, label, placeholder)[1]"
                            @change="triggerValueChange(type, prop)"
                          />
                        </template>
                        <!-- / 时间区域选择器 -->
                        <!-- / 复选框 -->
                        <template v-if="[ComponentTypeEnums.CHECKBOX].includes(type)">
                          <el-checkbox-group
                            v-model="model[prop]"
                            v-bind="attribute"

                            :disabled="itemDisabled"
                            @change="triggerValueChange(type, prop)"
                          >
                            <template v-for="(item, itemIndex) of range" :key="itemIndex">
                              <el-checkbox :label="item.value">{{ item.label }}</el-checkbox>
                            </template>
                          </el-checkbox-group>
                        </template>
                        <!-- / 复选框 -->
                        <!-- / 复选框单选 -->
                        <template v-if="[ComponentTypeEnums.CHECKBOX_SINGLE].includes(type)">
                          <el-checkbox
                            v-model="model[prop]"
                            v-bind="attribute"

                            :disabled="itemDisabled"
                            :true-label="range[0] ? range[0].value : '1'"
                            :false-label="range[1] ? range[1].value : '0'"
                            @change="triggerValueChange(type, prop)"
                          />
                        </template>
                        <!-- / 级联 -->
                        <template v-if="[ComponentTypeEnums.CASCADER].includes(type)">
                          <BsgoalBaseCascader
                            v-bind="attribute"
                            v-model="model[prop]"
                            :options="range"
                            @on-change="
                              (value, values) => {
                                changeCascader(type, prop, values)
                              }
                            "
                          ></BsgoalBaseCascader>
                        </template>
                        <!-- / 级联 -->

                        <!-- / 级联-多选 -->
                        <template v-if="[ComponentTypeEnums.CASCADER_MULTIPLE].includes(type)">
                          <BsgoalBaseCascaderMultipl
                            v-bind="attribute"
                            v-model="model[prop]"
                            :options="range"
                            @on-change="triggerValueChange(type, prop)"
                          ></BsgoalBaseCascaderMultipl>
                        </template>
                        <!-- / 级联-多选 -->
                        <!-- / 模板 -->
                        <template v-if="[].includes(type)"> </template>
                        <!-- / 模板 -->
                      </el-config-provider>
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
              </template>
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
    /* padding: 16px 6px 8px 16px; */

    .el-form-item {
      // margin-bottom: 8px;
      margin-right: 10px;
    }

    div.el-input,
    div.el-select {
      width: 100%;
    }
  }
  .base_form--visible {
    width: 0px;
    height: 0px;
    overflow: hidden;
  }

  .bsgoal_base_form_item--disable {
    .el-form-item__content {
      background: #f5f7fa;
      outline: solid 1px #e4e7ed;
      border-radius: 4px;
      padding-left: 8px;
    }
  }

  .form_item_gap {
    margin: 16px 0;
    display: flex;
    align-items: center;
  }

  .item_gap_line,
  .item_gap_title {
    display: inline-block;
  }
  .item_gap_line {
    width: 3px;
    height: 16px;
    margin-right: 8px;
    background-color: var(--el-color-primary);
  }
  .item_gap_title {
    font-size: 16px;
    color: #303133;
  }
  .form_item_gap:first-child {
    margin-top: 0px;
  }
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-13 09:38:11
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-20 14:39:10
 * @FilePath: \common\src\components\bsgoal-base-search\index.vue
 * @Description: 表格查询 公共组件
 * 
-->

<script>
export default {
  name: 'BsgoalBaseSearch'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, unref, watchEffect, inject, nextTick } from 'vue'
import EnumType from '../../enums/enumType.js'
import baseDirective from '../../directives/directiveBase.js'
import BsgoalBaseLine from '../bsgoal-base-line/index.vue'
import BsgoalBaseSearchOperation from '../bsgoal-base-search-operation/index.vue'

// props
const props = defineProps({
  /**
   * >----------props----------<
   *  {
   *      label:'' //  名称
   *      value:'' //  值
   *      prop:''  //  绑定字段
   *      type:'text'  //  内容组件的类型 : 参照 enumType
   *      placeholder:''  // placeholder 提示文本
   *      readonly: false  // 是否为只读文本
   *      clearable:  true  //是否为可清空
   *  }
   *
   * >----------events----------<
   *
   *  on-search  // 触发查询
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
    default: 6
  }
})

// emits
const emits = defineEmits(['on-search', 'on-clear', 'on-change', 'on-fold'])

// el-from  的引用
const EL_FORM_REF = ref(null)

// 自定义指令
const vAlign = baseDirective.align

const model = ref({})
const watchPropList = []

/**
 * @Author: canlong.shen
 * @description: 绑定的对象
 * @param {*} computed
 * @default:
 * @return {*} model
 */
watchEffect(() => {
  const { configOptions } = props
  const options = unref(configOptions)
  options.forEach((fei) => {
    const { value = '', prop = '', type = '' } = fei
    if (![EnumType.INPUT, EnumType.INPUT_TEXT_AREA].includes(type)) {
      watchPropList.push(prop)
    }
    model.value[prop] = value
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
  const operationItemOption = {
    type: EnumType.OPERATION
  }
  return [...options, operationItemOption]
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
const triggerOperationSearch = () => {
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
  emits('on-search', modelValue)
}
// 默认查询一次
nextTick(() => {
  triggerOperationSearch()
})
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

// 折叠值
const transferFoldStatus = inject('transferFoldStatus')
const foldStatus = ref(false)
/**
 * @Author: canlong.shen
 * @description: 触发折叠
 * @default:
 * @return {*}
 */
const triggerOperationFold = (status = false) => {
  foldStatus.value = status
  if (transferFoldStatus) {
    transferFoldStatus.value = status
  }
  emits('on-fold', foldStatus)
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
  triggerOperationSearch()
  const emitValue = {
    type,
    prop,
    value: model.value[prop] || ''
  }
  emits('on-change', emitValue)
}
</script>
<template>
  <div class="bsgoal-base-search">
    <div class="base_search">
      <!-- / 表单内容 -->
      <el-form ref="EL_FORM_REF" label-suffix=":" :show-message="false" :model="model" v-align>
        <el-row>
          <template
            v-for="(
              {
                label = '',
                prop = '',
                type = 'text',
                placeholder = '',
                readonly = false,
                clearable = true,
                rows = 2,
                min = 1,
                max = 10,
                range = [],
                format = ''
              } = {},
              index
            ) of configOptionsGet"
            :key="index"
          >
            <el-col
              v-show="index < 7 || type === EnumType.OPERATION || (index >= 7 && foldStatus)"
              :xs="24"
              :sm="12"
              :md="medium"
            >
              <el-form-item :label="label" :prop="prop">
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
                      type="textarea"
                      :rows="rows"
                      :clearable="clearable"
                      :placeholder="placeholderSet(type, label, placeholder)"
                      @change="triggerValueChange(type, prop)"
                    />
                  </template>
                  <!-- / textarea 输入框组件 -->
                  <template v-if="type === EnumType.INPUT_NUMBER">
                    <el-input-number
                      v-model="num"
                      :min="min"
                      :max="max"
                      @change="triggerValueChange"
                    />
                  </template>
                  <!-- / 数字输入框 -->

                  <!-- / 单选框 -->
                  <template v-if="type === EnumType.RADIO">
                    <el-radio-group v-model="model[prop]" @change="triggerValueChange(type, prop)">
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
                      :active-value="range[0] || true"
                      :inactive-value="range[1] || false"
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
                  <!-- / 模板 -->
                  <template v-if="[].includes(type)"> </template>
                  <!-- / 模板 -->
                  <!-- / 操作组件 -->
                  <template v-if="[EnumType.OPERATION].includes(type)">
                    <BsgoalBaseSearchOperation
                      :fold="index >= 7"
                      @on-search="triggerOperationSearch"
                      @on-clear="triggerOperationClear"
                      @on-fold="triggerOperationFold"
                    />
                  </template>
                  <!-- / 操作组件 -->
                </template>
                <!-- E 内容组件 -->

                <!-- S 文本内容 -->
                <template v-else>
                  <div>
                    {{ model[prop] }}
                  </div>
                </template>
                <!-- E 文本内容 -->
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <!-- / 表单内容 -->
    </div>
    <!-- / 分割线 -->
    <BsgoalBaseLine />
    <!-- / 分割线 -->
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-search {
  .base_search {
    padding: 16px 6px 8px 16px;

    .el-form-item {
      margin-bottom: 8px;
      margin-right: 10px;
    }

    div.el-input,
    div.el-select {
      width: 100%;
    }
  }
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 14:58:44
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-19 17:35:13
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-time\index.vue
 * @Description: 时间选择器 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, unref, watchEffect, onMounted, nextTick, getCurrentInstance, toValue } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { dayjs } from 'element-plus'
const emits = defineEmits(['update:modelValue'])

defineOptions({
  name: 'BsgoalBaseTime'
})

const props = defineProps({
  /**
   * 绑定的值
   */
  modelValue: {
    type: [String],
    default: ''
  },
  /**
   * 提示占位符
   */
  placeholder: {
    type: [String],
    default: '请选择'
  },
  /**
   * 格式 HH:mm:ss
   */
  format: {
    type: [String],
    default: 'HH:mm'
  },
  /**
   * 箭头进行选择
   */
  arrowControl: {
    type: [Boolean],
    default: false
  },
  /**
   *  禁止选择部分小时选项
   */
  disabledHours: {
    type: [Function],
    default: () => {}
  },
  /**
   *  禁止选择部分分钟选项
   */
  disabledMinutes: {
    type: [Function],
    default: () => {}
  },
  /**
   *  禁止选择部分秒选项
   */
  disabledSeconds: {
    type: [Function],
    default: () => {}
  },
  /**
   * 完全只读
   */
  readonly: {
    type: [Boolean],
    default: false
  },
  /**
   * 禁用
   */
  disabled: {
    type: [Boolean],
    default: false
  },
  /**
   * 文本框可输入
   */
  editable: {
    type: [Boolean],
    default: false
  },
  /**
   * 是否显示清除按钮
   */
  clearable: {
    type: [Boolean],
    default: false
  },
  /**
   * 隐藏无效的值
   */
  hide: {
    type: [Boolean],
    default: false
  }
})

// ---> S 绑定值 <---

const bindValue = ref()

/**
 * @Author: canlong.shen
 * @description: 转换 字符串 time 为 Date
 * @default:
 * @return {*}
 */
const stringToDate = (timeString = '') => {
  return dayjs(`0000-00-00 ${timeString}`)
}

/**
 * @Author: canlong.shen
 * @description: 格式化 Date 为  time 字符串
 * @default:
 * @return {*}
 */
const dateToString = (date = new Date()) => {
  return dayjs(date).format(props.format)
}

watchEffect(() => {
  const { modelValue } = props
  const timeValue = unref(modelValue)
  if (timeValue) {
    bindValue.value = stringToDate(timeValue)
  }
})

/**
 * @Author: canlong.shen
 * @description: 触发 值变化
 * @default:
 * @return {*}
 */
const triggerChange = (date = new Date()) => {
  const formatValue = dateToString(date)
  emits('update:modelValue', formatValue)
}

// ---> E 绑定值 <---

// ---> S 隐藏不可选择项 <---
const BSGOAL_BASE_TIME_REF = ref(null)
const changeVisible = () => {
  const { hide = false } = props
  if (hide) {
    nextTick(() => {
      const liList = document.querySelectorAll('div.bsgoal_time_picker--disabled li.is-disabled')
      liList.forEach((el) => {
        // el.style.width = '1px'
        // el.style.height = '1px'
        // el.style.overflow = 'hidden'
      
      })
    })
  }
}
// ---> E 隐藏不可选择项 <---
</script>

<template>
  <div class="bsgoal-base-time" ref="BSGOAL_BASE_TIME_REF">
    <el-config-provider :locale="zhCn">
      <el-time-picker
        ref="EL_TIME_PICKER_REF"
        v-model="bindValue"
        class="base_time"
        popper-class="bsgoal_time_picker--disabled"
        :arrow-control="arrowControl"
        :format="format"
        :clearable="clearable"
        :readonly="readonly"
        :disabled="disabled"
        :editable="editable"
        :placeholder="placeholder"
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
        @change="triggerChange"
        @visible-change="changeVisible"
      />
    </el-config-provider>
  </div>
</template>
<style lang="scss">
/* 自定义样式
---------------------------------------------------------------- */
.bsgoal-base-time {
  .el-input__prefix,
  .el-input__suffix {
    position: initial;

     width: 0;
     height: 0;
     overflow: hidden;
  }
}
</style>

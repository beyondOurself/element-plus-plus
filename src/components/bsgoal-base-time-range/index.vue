<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 14:09:57
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 16:54:26
 * @FilePath: \common\src\components\bsgoal-base-time-range\index.vue
 * @Description: 时间选择 公共组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, unref, watch, watchEffect } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { dayjs } from 'element-plus'
const props = defineProps({
  /**
   * value
   */
  modelValue: {
    type: [Array],
    default: () => [new Date(), new Date()]
  },

  /**
   * 开始时间 绑定的值
   */
  startTime: {
    type: [String],
    default: ''
  },
  /**
   * 结束时间 绑定的值
   */
  endTime: {
    type: [String],
    default: ''
  },
  /**
   * 格式 HH:mm:ss
   */
  format: {
    type: [String],
    default: 'HH:mm'
  }
})

const emits = defineEmits(['update:modelValue', 'update:startTime', 'update:endTime'])
// ---> S 值绑定 <---
const bindValue = ref([])

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
  const { startTime = '', endTime = '', modelValue = [] } = props
  let startDate = new Date()
  let endDate = new Date()
  const startTimeValue = unref(startTime)
  const endTimeValue = unref(endTime)
  const modelValueList = unref(modelValue)
  if (startTimeValue && endTimeValue) {
    startDate = stringToDate(startTimeValue)
    endDate = stringToDate(endTimeValue)
  } else if (Array.isArray(modelValueList) && modelValueList.length === 2) {
    const { 0: startValue = '', 1: endValue = '' } = modelValueList
    startDate = stringToDate(startValue)
    endDate = stringToDate(endValue)
  }

  bindValue.value = [startDate, endDate]
})

/**
 * @Author: canlong.shen
 * @description: 触发 值变化
 * @default:
 * @return {*}
 */
const triggerChange = (range = []) => {
  const { startTime = '', endTime = ''  } = props

  const { 0: startDate, 1: endDate } = range
  const startDateFormat = dateToString(startDate)
  const endDateFormat = dateToString(endDate)
  if (unref(startTime) && unref(endTime)) {
    emits('update:startTime', startDateFormat)
    emits('update:endTime', endDateFormat)
  } else {
    emits('update:modelValue', [startDateFormat, endDateFormat])
  }
}

// ---> E 值绑定 <---
</script>
<script>
export default {
  name: 'BsgoalBaseTimeRange'
}
</script>
<template>
  <div class="bsgoal-base-time-range">
    <el-config-provider :locale="zhCn">
      <el-time-picker
        v-model="bindValue"
        is-range
        class="base_time_range"
        :format="format"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="triggerChange"
      />
    </el-config-provider>
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

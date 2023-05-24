<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 14:58:44
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 16:36:56
 * @FilePath: \common\src\components\bsgoal-base-time\index.vue
 * @Description: 时间选择器 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, unref, watchEffect } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { dayjs } from 'element-plus'
const emits = defineEmits(['update:modelValue'])
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
</script>

<script>
export default {
  name: 'BsgoalBaseTime'
}
</script>
<template>
  <div class="bsgoal-base-time">
    <el-config-provider :locale="zhCn">
      <el-time-picker
        v-model="bindValue"
        class="base_time"
        :format="format"
        :clearable="false"
        :placeholder="placeholder"
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

<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 14:58:50
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-19 17:28:17
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-time\demo.vue
 * @Description: 时间选择器
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseTime from './index.vue'

defineOptions({
  name: 'BsgoalBaseTimeDemo'
})

const props = defineProps({})
const time = ref('11:22')

const makeRange = (start, end) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }

  // console.log('makeRange',result);
  return result
}
const disabledHours = () => {
  return [16]
}
const disabledMinutes = (hour) => {
  const disabledM = []
   for(let i = 0 ; i < 60 ; i ++){
    disabledM.push(i)
   }

   console.log('disabledM',disabledM);

   return disabledM
}
const disabledSeconds = (hour, minute) => {
  if (hour === 18 && minute === 30) {
    return makeRange(1, 59)
  }
}
</script>
<template>
  <div class="bsgoal-base-time-demo">
    <div class="base_time_demo">
      {{ time }}
      <BsgoalBaseTime
        v-model="time"
        hide
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
      />
      <BsgoalBaseTime
        v-model="time"
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
      />
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

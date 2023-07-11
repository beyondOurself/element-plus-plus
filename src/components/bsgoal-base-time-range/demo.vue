<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 14:10:03
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-07-11 10:34:27
 * @FilePath: \common\src\components\bsgoal-base-time-range\demo.vue
 * @Description: 时间选择 演示 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseTimeRange from './index.vue'

defineOptions({
  name: 'BsgoalBaseTimeDemoRange'
})

const props = defineProps({})

const timeRange = ref(['11:00', '12:12'])

const timeList = ref([
  {
    startTime: '00:00',
    endTime: '01:00'
  }
])

const startTime = ref('12:11')
const endTime = ref('13:55')

const changeTime = (start = '' , end = '') => {
    console.log('start',start);
    console.log('end',end);
}
</script>
<template>
  <div class="bsgoal-base-time-range-demo">
    <div>{{ timeRange }}</div>
    <div>{{ startTime }}</div>
    <div>{{ endTime }}</div>
    <div>{{ timeList[0]['startTime'] }}</div>
    <div>{{ timeList[0]['endTime'] }}</div>
    <BsgoalBaseTimeRange
      :body-style="{ width: '100%' }"
      :modelValue="[timeList[0]['startTime'], timeList[0]['endTime']]"
      class="base_time_range_demo"
      @on-change="changeTime"
    />
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

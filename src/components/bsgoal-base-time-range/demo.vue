<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 14:10:03
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 16:40:42
 * @FilePath: \common\src\components\bsgoal-base-time-range\demo.vue
 * @Description: 时间选择 演示 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseTimeRange from './index.vue'
const props = defineProps({})

const timeRange = ref(['11:00', '12:12'])

const startTime = ref('12:11')
const endTime = ref('13:55')
</script>
<script>
export default {
  name: 'BsgoalBaseTimeDemoRange'
}
</script>
<template>
  <div class="bsgoal-base-time-range-demo">
    <div>{{ timeRange }}</div>
    <div>{{ startTime }}</div>
    <div>{{ endTime }}</div>
    <BsgoalBaseTimeRange
      v-model:startTime="startTime"
      v-model:endTime="endTime"
      v-model="timeRange"
      class="base_time_range_demo"
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

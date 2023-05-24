<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 14:58:50
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 15:37:12
 * @FilePath: \common\src\components\bsgoal-base-time\demo.vue
 * @Description: 时间选择器
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseTime from './index.vue'
const props = defineProps({})
const time = ref('11:22')
</script>
<script>
export default {
  name: 'BsgoalBaseTimeDemo'
}
</script>
<template>
  <div class="bsgoal-base-time-demo">
    <div class="base_time_demo">
        {{ time }}
      <BsgoalBaseTime v-model="time" />
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

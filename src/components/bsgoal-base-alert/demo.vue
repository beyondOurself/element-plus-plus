<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 09:13:02
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-26 15:51:21
 * @FilePath: \common\src\components\bsgoal-base-alert\demo.vue
 * @Description: alert 提示演示
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseAlert from './index.vue'

defineOptions({
  name: 'BsgoalBaseAlertDemo'
})

const props = defineProps({})
</script>
<template>
  <div class="$bsgoal-base-alert-demo">
    <div class="base_alert_demo">
      <BsgoalBaseAlert> 我就是我 </BsgoalBaseAlert>
      <BsgoalBaseAlert type="success"> 我就是我 </BsgoalBaseAlert>
      <BsgoalBaseAlert type="error"> 我就是我 </BsgoalBaseAlert>
      <BsgoalBaseAlert type="warning"> 我就是我 </BsgoalBaseAlert>
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

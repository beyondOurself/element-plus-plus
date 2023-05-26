<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 17:20:47
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 17:43:05
 * @FilePath: \common\src\components\bsgoal-base-switch\demo.vue
 * @Description: 开关 公共组件 演示
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseSwitch from './index.vue'

defineOptions({
  name: 'BsgoalBaseSwitchDemo'
})

const props = defineProps({})

const modelValue = ref('0')
</script>
<template>
  <div class="bsgoal-base-switch-demo">
    <div class="base_switch_demo">
        {{ modelValue }}
      <BsgoalBaseSwitch v-model="modelValue" />
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

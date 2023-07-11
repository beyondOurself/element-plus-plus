<!--
 * @Author: canlong.shen
 * @Date: 2023-05-29 09:38:59
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-07-11 09:36:34
 * @FilePath: \common\src\components\bsgoal-base-input\demo.vue
 * @Description: Input 输入框 演示
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseInput from './index.vue'
defineOptions({
  name: 'BsgoalBaseInputDemo'
})
const props = defineProps({})

const inputValue = ref('')

const test = () => {
  inputValue.value = '666'
}
</script>
<template>
  <div class="bsgoal-base-input-demo">
    <div class="base_input_demo">
      {{ inputValue }}
      <BsgoalBaseInput
        v-model="inputValue"
      >
       <template #suffix>
           <div>111</div>
       </template>
      </BsgoalBaseInput>
      <el-button type="primary" @click="test">测试</el-button>
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

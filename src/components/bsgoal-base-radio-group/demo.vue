<!--
 * @Author: canlong.shen
 * @Date: 2023-09-05 17:49:55
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-09 16:41:49
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-radio-group\demo.vue
 * @Description:  单选框组 - 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'

import BsgoalBaseRadioGroup from './index.vue'

defineOptions({
  name: 'BsgoalBaseRadioGroupDemo'
})
const props = defineProps({})

const radioGroupOptions = ref([
  {
    label: 'label1',
    value: 'value1'
  },
  {
    label: 'label2',
    value: 'value2'
  },
  {
    label: 'label3',
    value: 'value3'
  },
  {
    label: 'label4',
    value: 'value4',
    disabled: true
  }
])
</script>
<template>
  <div class="bsgoal-base-radio-group-demo">
    <BsgoalBaseRadioGroup mode="radio" :options="radioGroupOptions" />

    <el-icon :size="size" :color="color">
      <Edit />
    </el-icon>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-radio-group-demo {
}
</style>

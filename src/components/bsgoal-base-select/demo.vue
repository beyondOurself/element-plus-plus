<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 11:10:09
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 14:07:27
 * @FilePath: \common\src\components\bsgoal-base-select\demo.vue
 * @Description: select  演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseSelect from './index.vue'

const props = defineProps({})

const selectValue = ref('11')
const selectRange = ref([
    {
      label : '11' ,
      value : '11'
    },
    {
      label : '22' ,
      value : '22'
    },
    {
      label : '33' ,
      value : '33'
    },
])



</script>
<script>
export default {
  name: 'BsgoalBaseSelectDemo'
}
</script>
<template>
  <div class="bsgoal-base-select-demo">
    <div class="base_select_demo">
        {{ selectValue }}
        <BsgoalBaseSelect  v-model="selectValue" :range="selectRange" />
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

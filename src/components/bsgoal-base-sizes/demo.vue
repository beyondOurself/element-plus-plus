<!--
 * @Author: canlong.shen
 * @Date: 2023-06-27 17:10:41
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-28 09:12:38
 * @FilePath: \common\src\components\bsgoal-base-sizes\demo.vue
 * @Description: 页数切换
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseSizes from './index.vue'
defineOptions({
  name: 'BsgoalBaseSizesDemo'
})

const props = defineProps({})

const triggerSizeChange = (params = '') => {
  console.log(params)
}
</script>
<template>
  <div class="bsgoal-base-sizes-demo">
    <div style="height: 400px; background-color: red"></div>
    <BsgoalBaseSizes :page-size="20" @on-size-change="triggerSizeChange" />
  </div>
</template>
<style lang="scss">
.bsgoal-base-sizes-demo {
}
</style>

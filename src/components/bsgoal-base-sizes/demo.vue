<!--
 * @Author: canlong.shen
 * @Date: 2023-06-27 17:10:41
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-27 18:02:44
 * @FilePath: \common\src\components\bsgoal-base-sizes\demo.vue
 * @Description: 页数切换
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue';
import  BsgoalBaseSizes from './index.vue'; 
defineOptions({
   name:'BsgoalBaseSizesDemo'
})
  
 const props = defineProps({
  
})
  
</script>
<template>
  <div class="bsgoal-base-sizes-demo">
    <div style="height: 400px; background-color: red;"></div>
    <BsgoalBaseSizes />
  </div>
</template>
<style lang="scss">
.bsgoal-base-sizes-demo {
     
}
</style>
<!--
 * @Author: canlong.shen
 * @Date: 2023-04-13 17:14:13
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-13 17:51:52
 * @FilePath: \common\src\components\bsgoal-base-line\demo.vue
 * @Description: 分割线公共组件 演示 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import  BsgoalBaseLine from './index.vue'
import { ref } from 'vue';

defineOptions({
  name: 'BsgoalBaseLineDemo'
})

 const props = defineProps({

})
</script>
<template>
  <div class="bsgoal-base-line-demo" >
       <BsgoalBaseLine  />
       <BsgoalBaseLine vertical />
  </div>
</template>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
.bsgoal-base-line-demo {
    height: 100%;
}
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>
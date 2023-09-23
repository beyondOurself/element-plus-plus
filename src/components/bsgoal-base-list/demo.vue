<!--
 * @Author: canlong.shen
 * @Date: 2023-09-22 17:51:36
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-23 09:43:46
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-list\demo.vue
 * @Description:  列表组件 - 演示
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseList from './index.vue'
defineOptions({
  name: 'BsgoalBaseListDemo'
})
const props = defineProps({})
</script>
<template>
  <div class="bsgoal-base-list-demo">
    <BsgoalBaseList></BsgoalBaseList>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-list-demo {
}
</style>

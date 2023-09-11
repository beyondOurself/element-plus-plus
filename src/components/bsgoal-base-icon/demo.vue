<!--
 * @Author: canlong.shen
 * @Date: 2023-09-06 17:27:58
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-06 17:42:31
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-icon\demo.vue
 * @Description: 图标 - 演示
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import BsgoalBaseIcon from './index.vue';
import { ref } from 'vue'
defineOptions({
  name: 'BsgoalBaseIconDemo'
})
const props = defineProps({})
</script>
<template>
  <div class="bsgoal-base-icon-demo">
    <BsgoalBaseIcon src="https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/button/icon_Edit.svg" ></BsgoalBaseIcon>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-icon-demo {
}
</style>

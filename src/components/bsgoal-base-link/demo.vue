<!--
 * @Author: canlong.shen
 * @Date: 2023-05-10 13:40:43
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-10 13:55:36
 * @FilePath: \common\src\components\bsgoal-base-link\demo.vue
 * @Description: 链接公共组件 演示
 * 
-->

<script>
export default {
  name: "BsgoalBaseLinkDemo",
};
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue';
import  BsgoalBaseLink  from './index.vue'
// props
 const props = defineProps({

})

const clickLink = () => {
     console.log('点击链接了');
}
</script>
<template>
  <div class="bsgoal-base-link-demo">
     <BsgoalBaseLink content="这是链接" @on-click="clickLink" />
     <BsgoalBaseLink underline content="这是链接" @on-click="clickLink" />
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


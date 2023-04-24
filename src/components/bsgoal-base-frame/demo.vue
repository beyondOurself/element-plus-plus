<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 15:58:55
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-11 14:00:19
 * @FilePath: \common\src\components\bsgoal-base-frame\demo.vue
 * @Description: 内容框架公共组件演示
 * 
-->

<template>
  <div class="bsgoal-base-frame-demo">
      <BsgoalBaseFrame />
  </div>
</template>
<script>
export default {
  name: "BsgoalBaseFrameDemo",
};
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import BsgoalBaseFrame from './index.vue'
import { ref, computed, toRefs, watch, unref
} from 'vue';
</script>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>
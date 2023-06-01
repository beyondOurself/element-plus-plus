<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 14:12:09
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-26 16:10:56
 * @FilePath: \common\src\components\layout\layout-right-container.vue
 * @Description: 主体内容容器
 * 
-->


<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, toRefs, watch, unref } from 'vue'

defineOptions({
  name: 'LayoutRightContainer'
})

</script>
<template>
  <div class="layout-right-container">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
.layout-right-container {
  height: calc(100vh - 80px);
  overflow-y: scroll;
  position: relative;
}
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 14:09:54
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-26 16:11:29
 * @FilePath: \common\src\components\layout\layout-top-header.vue
 * @Description: 头部
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, toRefs, watch, unref } from 'vue'

defineOptions({
  name: 'LayoutTopHeader'
})
</script>
<template>
  <div class="layout-top-header">
    <h1>公共组件演示</h1>
  </div>
</template>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
.layout-top-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

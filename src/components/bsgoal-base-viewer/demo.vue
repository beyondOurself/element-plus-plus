<!--
 * @Author: canlong.shen
 * @Date: 2023-06-21 16:08:07
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-25 09:59:14
 * @FilePath: \common\src\components\bsgoal-base-viewer\demo.vue
 * @Description: 图片预览 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseViewer from './index.vue'
defineOptions({
  name: 'BsgoalBaseViewerDemo'
})

const props = defineProps({})
const src = ref('https://img.phb123.com/uploads/allimg/200615/60-2006151H317-52.jpg')
</script>
<template>
  <div class="bsgoal-base-viewer-demo">
    <BsgoalBaseViewer :src="src" />
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

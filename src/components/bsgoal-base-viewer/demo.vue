<!--
 * @Author: canlong.shen
 * @Date: 2023-06-21 16:08:07
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-26 14:49:59
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-viewer\demo.vue
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
const src = ref([
  'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_event.svg',
  'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_event.svg',
  'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_event.svg',
  'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_event.svg',
])
</script>
<template>
  <div class="bsgoal-base-viewer-demo">
    <BsgoalBaseViewer :src="src" :width="80"  radius="20" />
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

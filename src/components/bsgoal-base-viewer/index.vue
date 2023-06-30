<!--
 * @Author: canlong.shen
 * @Date: 2023-06-21 16:08:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-25 10:00:41
 * @FilePath: \common\src\components\bsgoal-base-viewer\index.vue
 * @Description: 图片 预览
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed } from 'vue'
import { preview, vPreview, Vue3ImagePreview } from 'vue3-image-preview'
import uploadDefaultIcon from './assets/upload_default.svg'
defineOptions({
  name: 'BsgoalBaseViewer'
})

const props = defineProps({
  /**
   * 宽度
   */
  width: {
    type: [String, Number],
    default: '48'
  },
  /**
   * 宽度
   */
  height: {
    type: [String, Number],
    default: '48'
  },
  /**
   * 预览图片路径
   */
  src: {
    type: [String],
    default: ''
  }
})

const srcGet = computed(() => {
  const { src = '' } = props
  if (!src) {
    return uploadDefaultIcon
  }
  return src
})
</script>
<template>
  <div class="bsgoal-base-viewer">
    <div class="base_viewer">
      <img v-preview :src="srcGet" :style="{ width: `${width}px`, height: `${height}px` }" />
    </div>
  </div>
</template>
<style lang="scss">
.bsgoal-base-viewer {
  display: inline-block;
  .base_viewer {
    margin: 4px 8px;
  }
}
</style>

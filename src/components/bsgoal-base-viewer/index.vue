<!--
 * @Author: canlong.shen
 * @Date: 2023-06-21 16:08:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-25 09:00:44
 * @FilePath: \common\src\components\bsgoal-base-viewer\index.vue
 * @Description: 图片 预览
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import { preview, vPreview, Vue3ImagePreview } from 'vue3-image-preview'
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

// https://img.phb123.com/uploads/allimg/200615/60-2006151H317-52.jpg
</script>
<template>
  <div class="bsgoal-base-viewer">
    <div class="base_viewer">
      <img
        v-preview
        :src="src"
        :style="{ width: `${width}px`, height: `${height}px` }"
      />
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

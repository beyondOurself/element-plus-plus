<!--
 * @Author: canlong.shen
 * @Date: 2023-06-21 16:08:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-26 14:49:48
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-viewer\index.vue
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
    default: 48
  },
  /**
   * 宽度
   */
  height: {
    type: [String, Number],
    default: 48
  },
  /**
   * 预览图片路径
   */
  src: {
    type: [String, Array],
    default: ''
  },

  /**
   * 内容的 style
   */
  bodyStyle: {
    type: [Object],
    default: () => ({})
  },
  /**
   * 图片的 圆角弧度
   */
  radius: {
    type: [Number,String],
    default: 0
  }
})

const srcGet = computed(() => {
  const { src = '' } = props
  if (!src) {
    return uploadDefaultIcon
  }
  return Array.isArray(src) ? src[0] : src
})

const handlePreview = () => {
  preview({
    images: props.src
  })
}

const imgStyleGet = computed(() => {
  const styler = {}

  const { width = 0, height = 0, radius = 0 } = props

  if (Number.isInteger(width) && Number.isInteger(height)) {
    styler.width = `${width}px`
    styler.height = `${width}px`
  } else {
    styler.width = `${width}`
    styler.height = `${width}`
  }

  if (radius) {
    styler.borderRadius = `${radius}px`
  }

  return styler
})
</script>
<template>
  <div class="bsgoal-base-viewer">
    <div class="base_viewer" :style="bodyStyle">
      <img @click="handlePreview" :src="srcGet" :style="imgStyleGet" />
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

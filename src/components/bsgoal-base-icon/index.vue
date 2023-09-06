<!--
 * @Author: canlong.shen
 * @Date: 2023-09-06 17:27:52
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-06 17:45:30
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-icon\index.vue
 * @Description: 图标 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, toValue } from 'vue'
defineOptions({
  name: 'BsgoalBaseIcon'
})
const props = defineProps({
  /**
   * 路径
   */
  src: {
    type: [String],
    default: ''
  },
  /**
   * 颜色
   */
  color: {
    type: [String],
    default: 'var(--el-color-primary)'
  },
  /**
   * 宽
   */
  width: {
    type: [Number, String],
    default: 18
  },
  /**
   * 高
   */
  height: {
    type: [Number, String],
    default: ''
  }
})

const srcGet = computed(() => {
  const { src = '' } = props
  return src
})
const widthGet = computed(() => {
  const { width } = props
  return Number.isInteger(width) ? `${width}px` : width
})
const heightGet = computed(() => {
  const { height } = props
  return Number.isInteger(height) ? `${height}px` : height
})
const styleGet = computed(() => {
  const styler = {}
  const widthValue = toValue(widthGet)
  const heightValue = toValue(heightGet)
  styler.width = widthValue
  styler.height = toValue(heightValue) || toValue(widthValue)

  return styler
})
const imgStyleGet = computed(() => {
  const styler = {}
  const { color = '' } = props

  const widthValue = toValue(widthGet)
  const heightValue = toValue(heightGet)

  if (color) {
    styler.filter = `drop-shadow(${color} ${widthValue} 0)`
    styler.transform = `translateX(-${widthValue})`
    styler.width = widthValue
    styler.height = heightValue || widthValue
  }
  return styler
})
</script>
<template>
  <div class="bsgoal-base-svg" :style="styleGet">
    <img class="base_svg_img" :style="imgStyleGet" :src="srcGet" alt="" srcset="" />
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>

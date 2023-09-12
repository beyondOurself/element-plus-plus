<!--
 * @Author: canlong.shen
 * @Date: 2023-09-06 17:27:52
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-12 14:29:44
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-icon\index.vue
 * @Description: 图标 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, toValue, inject } from 'vue'
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

const iconMapping = inject('ICON_MAPPING')

console.log('iconMapping', iconMapping)

const srcGet = computed(() => {
  const { src = '' } = props
  const srcSplitlist = src.split('>')
  if (iconMapping && srcSplitlist.length === 2) {
    const { 0: group, 1: name } = srcSplitlist
    try {
      const mappingSrc = iconMapping[group][name]
      return mappingSrc
    } catch (error) {
      console.log('BsgoalBaseIcon', '映射的图标路径异常')
    }
  }

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

const colorGet = computed(() => {
  const { color = '' } = props
  switch (color) {
    case 'white':
      return '#ffffff'
    case 'info':
      return '#848484'
    case 'primary':
      return 'var(--el-color-primary)'
  }
  return color
})

const imgStyleGet = computed(() => {
  const styler = {}
  const colorValue = toValue(colorGet)
  const widthValue = toValue(widthGet)
  const heightValue = toValue(heightGet)

  if (colorValue) {
    styler.filter = `drop-shadow(${colorValue} ${widthValue} 0)`
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>

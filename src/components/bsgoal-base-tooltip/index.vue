<!--
 * @Author: canlong.shen
 * @Date: 2023-05-04 10:59:25
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-23 11:27:10
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-tooltip\index.vue
 * @Description:  文字提示公共组件 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, unref } from 'vue'

defineOptions({
  name: 'BsgoalBaseTooltip'
})

const props = defineProps({
  /**
   * 文字提示内容
   */
  content: {
    type: [String],
    default: ''
  },
  /**
   * 类型
   */
  type: {
    type: [String],
    default: 'text',
    validator: (v) => ['text', 'custom'].includes(v)
  },
  /**
   * 限定显示的字符
   */
  limit: {
    type: [Number],
    default: 10
  },
  /**
   *  最大内容宽度
   */
  max: {
    type: [Number, String],
    default: '10em'
  },
  /**
   * 空字段 默认值
   */
  none: {
    type: [String],
    default: '无'
  },
})

// ---> S 字符数限制 <---
const contentGet = computed(() => {
  const { content = '', limit = 0, none = '' } = props
  let contentString = content
  const contentLength = `${content|| ''}`.length
  if (limit && contentLength > limit) {
    contentString = `${content.substring(0, limit)}...`
  }
  return contentString || none
})
// ---> E 字符数限制 <---

// ---> S 禁用tooltip <---
const disabledGet = computed(() => {
  const { content = '', limit = 0 } = props
  return `${content || ''}`.length < limit || !limit
})
// ---> E 禁用tooltip <---
</script>
<template>
  <div class="bsgoal-base-tooltip">
    <el-tooltip
      class="base_tooltip"
      effect="dark"
      popper-class="base_tooltip_popper"
      placement="top-start"
      :content="content"
      :disabled="disabledGet"
    >
      <slot>
        {{ contentGet }}
      </slot>
    </el-tooltip>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-tooltip {
  display: inline-block;
}

.base_tooltip_popper {
  max-width: 20em;
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-05-04 10:59:25
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-04 11:21:59
 * @FilePath: \common\src\components\bsgoal-base-tooltip\index.vue
 * @Description:  文字提示公共组件 
 * 
-->

<script>
export default {
  name: 'BsgoalBaseTooltip'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed } from 'vue'
// props
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
  }
})

// ---> S 字符数限制 <---
const contentGet = computed(() => {
  const { content = '', limit = 0 } = props
  let contentString = content
  const contentLength = content.length
  if (contentLength > limit) {
    contentString = `${contentString.substring(0, limit)}...`
  }
  return contentString
})
// ---> E 字符数限制 <---
</script>
<template>
  <div class="bsgoal-base-tooltip">
    <el-tooltip
      class="base_tooltip"
      effect="dark"
      popper-class="base_tooltip_popper"
      placement="top-start"
      :content="content"
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
}

.base_tooltip_popper {
  max-width: 20em;
}
</style>

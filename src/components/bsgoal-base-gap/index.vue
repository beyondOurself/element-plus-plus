<!--
 * @Author: canlong.shen
 * @Date: 2023-09-27 09:51:56
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-27 10:24:13
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-gap\index.vue
 * @Description: 分割公共组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
defineOptions({
  name: 'BsgoalBaseGap'
})
const props = defineProps({
  /**
   * 内容
   */
  content: {
    type: [String],
    default: '内容'
  },
  /**
   * 前置 样式
   */
  prefixStyle: {
    type: [Object],
    default: () => ({})
  },
  /**
   * 前置 样式
   */
  contentStyle: {
    type: [Object],
    default: () => ({})
  }
})
</script>
<template>
  <div class="bsgoal-base-gap">
    <div class="base_gap">
      <!-- S 前缀图形 -->
      <div class="base_gap_prefix">
        <slot name="prefix">
          <div class="prefix_line" :style="prefixStyle"></div>
        </slot>
      </div>
      <!-- E 前缀图形 -->

      <!-- S 内容 -->
      <div class="base_gap_content">
        <slot name="content">
          <div class="content_default" :style="contentStyle">
            <span>{{ content }}</span>
          </div>
        </slot>
      </div>
      <!-- E 内容 -->
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-gap {
  .base_gap {
    display: flex;
    align-items: center;
  }
  .base_gap_prefix,
  .base_gap_content {
    display: inline-block;
  }

  .prefix_line {
    width: 3px;
    height: 16px;
    background-color: var(--el-color-primary);
  }
  .content_default {
    margin-left: 8px;
    font-size: 16px;
    color: #303133;
  }
}
</style>

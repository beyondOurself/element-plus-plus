<!--
 * @Author: canlong.shen
 * @Date: 2023-06-21 15:12:28
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-21 15:38:11
 * @FilePath: \common\src\components\bsgoal-baes-popover\index.vue
 * @Description: 弹出框 公共组件 
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'

defineOptions({
  name: 'BsgoalBaesPopover'
})

const props = defineProps({
  /**
   * 内容
   */
  content: {
    type: [String],
    default: ''
  },
  /**
   * 标题
   */
  title: {
    type: [String],
    default: ''
  },
  /**
   * 宽度
   */
  width: {
    type: [Number],
    default: 200
  }
})
</script>
<template>
  <div class="bsgoal-baes-popover">
    <el-popover
      class="baes_popover"
      placement="top-start"
      trigger="hover"
      :width="width"
      :title="title"
      :content="content"
    >
      <template #reference>
        <slot></slot>
      </template>
    </el-popover>
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

<!--
 * @Author: canlong.shen
 * @Date: 2023-05-20 13:51:38
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-20 15:22:33
 * @FilePath: \common\src\components\bsgoal-base-layout\index.vue
 * @Description: 响应式 布局
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, useSlots } from 'vue'
// props
const props = defineProps({
  /**
   * 间隔
   */
  gutter: {
    type: [Number],
    default: 0
  },
  /**
   * 划分的比例
   */
  ratio: {
    type: [Number],
    default: 12
  }
})

// ---> S 插槽 <---
const slots = useSlots()
const slotNames = ref(Object.keys(slots))
// ---> E 插槽 <---
</script>
<script>
export default {
  name: 'BsgoalBaseLayout'
}
</script>
<template>
  <div class="bsgoal-base-layout">
    <el-row class="base_layout" :gutter="gutter">
      <template v-for="(name, key) of slotNames" :key="key">
        <el-col :xs="24" :sm="24" :md="ratio" :lg="ratio" :xl="ratio">
          <slot :name="name"></slot>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-layout {
}
</style>

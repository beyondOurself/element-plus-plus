<!--
 * @Author: canlong.shen
 * @Date: 2023-06-27 16:52:31
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-27 18:10:25
 * @FilePath: \common\src\components\bsgoal-base-sizes\index.vue
 * @Description: 页数切换 公共组件
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
defineOptions({
  name: 'BsgoalBaseSizes'
})

const props = defineProps({
  /**
   * 切换页数数组
   */
  pageSizes: {
    type: [Array],
    default: () => [10, 20, 30, 40, 50, 100]
  }
})

// ---> S popover <---

const suffixIcon = ref(ArrowDown)

const showPopover = () => {
  suffixIcon.value = ArrowUp
}
const hidePopover = () => {
  suffixIcon.value = ArrowDown
}
// ---> E popover <---
</script>
<template>
  <div class="bsgoal-base-sizes">
    <el-popover
      class="base_sizes"
      placement="top"
      trigger="click"
      width="100%"
      :teleported="false"
      @show="showPopover"
      @hide="hidePopover"
    >
      <template #reference>
        <el-input
          readonly
          class="base_sizes_input"
          placeholder="Please input"
          :suffix-icon="suffixIcon"
        >
        </el-input>
      </template>

      <template #default>
        <template v-for="(size, key) of pageSizes" :key="key">
          <div class="base_sizes_item">
            {{ `${size}条/页` }}
          </div>
        </template>
      </template>
    </el-popover>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-sizes {
  .base_sizes_input {
    cursor: pointer;
  }
  .base_sizes_item {
    text-align: center;
    font-size: 14px;
    padding: 0 20px;
    color: #606266;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
  }

  .base_sizes_item:hover {
    background-color: #F5F7FA;
  }

  .base_sizes_item--selected {
    color: #409eff;
    font-weight: 700;
  }
}
</style>

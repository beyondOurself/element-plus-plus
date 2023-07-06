<!--
 * @Author: canlong.shen
 * @Date: 2023-06-27 16:52:31
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-07-06 11:23:17
 * @FilePath: \common\src\components\bsgoal-base-sizes\index.vue
 * @Description: 页数切换 公共组件
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watch, watchEffect } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
defineOptions({
  name: 'BsgoalBaseSizes'
})

const props = defineProps({
  /**
   * 每页显示个数选择器的选项设置
   */
  pageSizes: {
    type: [Array],
    default: () => [10, 20, 30, 40, 50, 100]
  },

  /**
   * 每页显示条目个数
   */
  pageSize: {
    type: [Number],
    default: 0
  },
  /**
   * width 宽度
   */
  width: {
    type: [String, Number],
    default: 100
  }
})

const emits = defineEmits(['on-size-change'])

// ---> S popover <---
const visible = ref(false)
const suffixIcon = ref(ArrowDown)

const showPopover = () => {
  suffixIcon.value = ArrowUp
}
const hidePopover = () => {
  suffixIcon.value = ArrowDown
}

const selectedIndex = ref(-1)
const selectedSize = ref(10)

watch(
  () => props.pageSize,
  () => {
    const { pageSize = 0, pageSizes = [] } = props

    const curIndex = pageSizes.findIndex((fi) => fi === pageSize)

    if (curIndex !== -1) {
      selectedIndex.value = curIndex
      selectedSize.value = pageSize
    }
  },
  {
    immediate: true
  }
)

/**
 * @Author: canlong.shen
 * @description: 单击单项
 * @param {*} size
 * @param {*} key
 * @default:
 * @return {*}
 */
const handleSizeItem = (size = 0, index = 0) => {
  selectedIndex.value = index
  selectedSize.value = size
  emits('on-size-change', size)
  visible.value = false
}
// ---> E popover <---

// ---> S input <---
const content = ref('')

watchEffect(() => {
  const curPageSize = selectedSize.value
  content.value = `${curPageSize}条/页`
})

const isMicroApp = window.__MICRO_APP_ENVIRONMENT__

// ---> E input <---
</script>
<template>
  <div class="bsgoal-base-sizes">
    <el-popover
      class="base_sizes"
      placement="top"
      trigger="click"
      :width="`${width}px`"
      v-model:visible="visible"
      :teleported="false"
      @show="showPopover"
      @hide="hidePopover"
    >
      <template #reference>
        <el-input
          v-model="content"
          readonly
          class="base_sizes_input"
          placeholder="Please input"
          :class="{ bsgoal_micro_app: isMicroApp }"
          :style="{ width: `${width}px` }"
          :suffix-icon="suffixIcon"
        >
        </el-input>
      </template>

      <template #default>
        <template v-for="(size, key) of pageSizes" :key="key">
          <div
            class="base_sizes_item"
            :class="{ 'base_sizes_item--selected': selectedIndex === key }"
            @click="handleSizeItem(size, key)"
          >
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
  display: inline-block;
  .base_sizes_input {
    cursor: pointer;
    margin-left: 16px;
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
    background-color: #f5f7fa;
  }

  .base_sizes_item--selected {
    color: var(--el-color-primary);
    font-weight: 700;
  }

  .bsgoal_micro_app {
    .el-input__suffix {
      margin-right: 8px !important;
    }
  }
}
</style>

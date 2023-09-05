<!--
 * @Author: canlong.shen
 * @Date: 2023-08-31 15:11:07
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-05 15:07:28
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-table-operation\index.vue
 * @Description:  表格 - 操作列
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, useSlots } from 'vue'

defineOptions({
  name: 'BsgoalBaseTableOperation'
})

const props = defineProps({
  /**
   *  宽度
   */
  width: {
    type: [Number],
    default: 150
  }
})

const slots = useSlots()
const slotNameList = Object.keys(slots)

const hasMore = ref(false)

if (slotNameList.includes('more')) {
  hasMore.value = true
}
</script>
<template>
  <div class="bsgoal-base-table-operation">
    <div class="base_table_operation">
      <slot></slot>
      <template v-if="hasMore">
        <el-popover
          placement="top-start"
          trigger="hover"
          popper-class="base_table_operation_popover"
          :width="width"
        >
          <template #reference>
            <el-button> 更多 </el-button>
          </template>
          <!-- S 更多 -->
          <div class="table_operation_popover_more">
            <slot name="more"></slot>
          </div>
          <!-- E 更多 -->
        </el-popover>
      </template>
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-table-operation {
  .base_table_operation {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}

.base_table_operation_popover {
  .table_operation_popover_more {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
   
    & > * {
      margin-left: 0px !important;
      margin-bottom: 8px !important;
      &:last-child {
        margin-bottom: 0px !important;
      }
    } 
  }
}
</style>

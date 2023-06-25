<!--
 * @Author: canlong.shen
 * @Date: 2023-04-13 18:09:43
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-25 17:35:04
 * @FilePath: \common\src\components\bsgoal-base-search-operation\index.vue
 * @Description:  表格查询操作项 组件
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { ref, unref } from 'vue'

defineOptions({
  name: 'BsgoalBaseSearchOperation'
})

defineProps({
  /**
   * 是否显示折叠按钮
   */
  fold: {
    type: [Boolean],
    default: false
  }
})

const emit = defineEmits(['on-fold'])



const foldStatus = ref(false); // 折叠的状态

/**
 * @Author: canlong.shen
 * @description: 折叠事件
 * @default: 
 * @return {}
 */
const handleFold = () => {
  foldStatus.value = !unref(foldStatus)
  emit('on-fold', foldStatus.value)
}


</script>
<template>
  <div class="bsgoal-base-search-operation">
    <el-button type="primary" :icon="Search" @click="$emit('on-search')">搜索</el-button>
    <el-button :icon="Delete" @click="$emit('on-clear')">清空</el-button>
    <div v-if="fold"  class="operation_fold" style="color:var(--el-color-primary);"  @click="handleFold"> {{ foldStatus ? '收起' : '展开' }}
      <el-icon color="var(--el-color-primary)">
        <ArrowUp v-show="foldStatus" />
        <ArrowDown v-show="!foldStatus" />
      </el-icon> </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-search-operation {
  display: flex;
  align-items: center;

  .operation_fold {
  margin-left: 12px;
  cursor: pointer;
  min-width: 3em;
}
}

</style>

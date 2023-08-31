<!--
 * @Author: canlong.shen
 * @Date: 2023-08-31 15:11:07
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-31 16:22:55
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-table-operation\demo.vue
 * @Description:  表格 - 操作列-演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseTableOperation from './index.vue'
defineOptions({
  name: 'BsgoalBaseTableOperationDemo'
})

const props = defineProps({})
</script>
<template>
  <div class="bsgoal-base-table-operation-demo">

    <BsgoalBaseTableOperation>
        <el-button> 按钮1</el-button>
        <el-button> 按钮2</el-button>
        <el-button> 按钮3</el-button>
         <template #more>
           <el-button type="primary">更多</el-button>
         </template>
    </BsgoalBaseTableOperation>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

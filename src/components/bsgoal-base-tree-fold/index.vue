<!--
 * @Author: canlong.shen
 * @Date: 2023-04-21 14:30:43
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-21 15:43:27
 * @FilePath: \common\src\components\bsgoal-base-tree-fold\index.vue
 * @Description:  树结构折叠按钮
 * 
-->

<script>
export default {
  name: 'BsgoalBaseTreeFold'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import { ArrowLeft ,ArrowRight } from '@element-plus/icons-vue'

defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

let status = ref(true)
const triggerFold = () => {
  status.value = !status.value
  emits('update:modelValue',status.value)
}



</script>
<template>
  <div class="bsgoal-base-tree-fold">
    <div class="base_tree_fold" :class="{'base_tree_fold--hide':!status}" @click="triggerFold">
      <el-icon color="#fff"><ArrowLeft v-show="status" />
      <ArrowRight v-show="!status" />
    </el-icon>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
.base_tree_fold {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  width: 14px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  background-color: #409eff;
}
.base_tree_fold--hide {
    right: 0px;
}
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

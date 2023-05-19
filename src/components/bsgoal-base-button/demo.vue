<!--
 * @Author: canlong.shen
 * @Date: 2023-05-18 16:24:31
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-19 13:41:17
 * @FilePath: \common\src\components\bsgoal-base-button\demo.vue
 * @Description:  按钮 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseButton from './index.vue'
// props
const props = defineProps({})

const task = (done) => {
  setTimeout(() => {
    done()
  }, 3000)
}
</script>
<script>
export default {
  name: 'BsgoalBaseButtonDemo'
}
</script>
<template>
  <div class="bsgoal-base-button-demo">
    <BsgoalBaseButton :task="task" plain > </BsgoalBaseButton>
    <BsgoalBaseButton :task="task" mode="add"> </BsgoalBaseButton>
    <BsgoalBaseButton :task="task" mode="delete"> </BsgoalBaseButton>
    <BsgoalBaseButton :task="task" #default="{ loading }">
      <div>
        {{ loading }}
        <el-button type="danger" :loading="loading">外部</el-button>
      </div>
    </BsgoalBaseButton>
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

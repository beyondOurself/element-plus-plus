<!--
 * @Author: canlong.shen
 * @Date: 2023-04-23 16:35:24
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-28 14:43:37
 * @FilePath: \common\src\components\bsgoal-base-dialog\demo.vue
 * @Description: 弹窗公共组件 演示
 * 
-->

<script>
export default {
  name: 'BsgoalBaseDialogDemo'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseDialog from './index.vue'


// props
const props = defineProps({})

const dialogVisible = ref(false)

const test = () => {
   console.log('点击了');
    dialogVisible.value = true

}

</script>
<template>
  <div class="bsgoal-base-dialog-demo">
    <div class="base_dialog_demo">
      <BsgoalBaseDialog v-model="dialogVisible" width="600" />
     <el-button type="primary" @click="test">打开弹窗22</el-button>
    </div>
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

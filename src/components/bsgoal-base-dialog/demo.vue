<!--
 * @Author: canlong.shen
 * @Date: 2023-04-23 16:35:24
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-18 14:56:57
 * @FilePath: \common\src\components\bsgoal-base-dialog\demo.vue
 * @Description: 弹窗公共组件 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseDialog from './index.vue'
import BsgoalBaseTabs from '../bsgoal-base-tabs/index.vue'

defineOptions({
  name: 'BsgoalBaseDialogDemo'
})

const props = defineProps({})

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)

const test = () => {
  dialogVisible.value = true
}
const test2 = () => {
  dialogVisible2.value = true
}

const activeTabName = ref('tab1')
const tabsConfigOptions = ref([
  {
    label: 'tab1',
    value: 'tab1'
  },
  {
    label: 'tab2',
    value: 'tab2'
  },
  {
    label: 'tab3',
    value: 'tab3'
  },
  {
    label: 'tab4',
    value: 'tab4'
  }
])

const triggerConfirm = (done) => {
   console.log('关闭前');
   done()
}
</script>
<template>
  <div class="bsgoal-base-dialog-demo">
    <div class="base_dialog_demo">
      <BsgoalBaseDialog v-model="dialogVisible" width="600" :footer="false">
        <BsgoalBaseTabs v-memo="activeTabName"  :config-options="tabsConfigOptions" />
        <template #footer>
          <el-button type="primary">底部按钮</el-button>
        </template>
      </BsgoalBaseDialog  >
      <BsgoalBaseDialog v-model="dialogVisible2" size="max" type="form" @on-confirm="triggerConfirm">
        <BsgoalBaseTabs v-memo="activeTabName" :config-options="tabsConfigOptions"   />
      </BsgoalBaseDialog >
      <el-button type="primary" @click="test">打开弹窗</el-button>
      <el-button type="primary" @click="test2">打开弹窗2</el-button>
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

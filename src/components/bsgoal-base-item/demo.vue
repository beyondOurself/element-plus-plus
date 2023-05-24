<!--
 * @Author: canlong.shen
 * @Date: 2023-05-24 17:46:26
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-24 18:31:39
 * @FilePath: \common\src\components\bsgoal-base-item\demo.vue
 * @Description: 表单项 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseItem from './index.vue'
import BsgoalBaseSwitch  from '../bsgoal-base-switch/index.vue';
const props = defineProps({})

</script>
<script>
export default {
  name: 'BsgoalBaseItemDemo'
}

const switchModelValue = ref('0')
</script>
<template>
  <div class="bsgoal-base-item-demo">
    <div class="base_item_demo">
      <BsgoalBaseItem label="是否开通接听值班表设置">
        <template #content>
          <div>
            <BsgoalBaseSwitch v-model="switchModelValue" />
          </div>
        </template>
      </BsgoalBaseItem>
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

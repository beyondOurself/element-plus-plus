<!--
 * @Author: canlong.shen
 * @Date: 2023-05-04 10:59:33
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-04 11:19:39
 * @FilePath: \common\src\components\bsgoal-base-tooltip\demo.vue
 * @Description: 文字提示公共组件演示
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue';
import  BsgoalBaseTooltip from './index.vue'

defineOptions({
  name: 'BsgoalBaseTooltipDemo'
})

 const props = defineProps({

})
</script>
<template>
  <div class="bsgoal-base-tooltip-demo">
    <div class="base_tooltip_demo">
        <BsgoalBaseTooltip content="愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人愚蠢的地球人" />
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

<!--
 * @Author: canlong.shen
 * @Date: 2023-08-19 14:53:17
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-19 15:37:04
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-time-select\demo.vue
 * @Description: 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseTimeSelect from './index.vue'

defineOptions({
  name: 'BsgoalBaseTimeSelectDemo'
})

const props = defineProps({})

const time = ref('23:59')
</script>
<template>
  <div class="bsgoal-base-time-select-demo">
    {{ time }}
    <BsgoalBaseTimeSelect v-model="time" step="00:00"></BsgoalBaseTimeSelect>
  </div>
</template>
<style lang="scss"></style>

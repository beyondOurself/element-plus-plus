<!--
 * @Author: canlong.shen
 * @Date: 2023-10-07 18:05:10
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-08 09:49:15
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-tag\demo.vue
 * @Description: 标签 - 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import BsgoalBaseTag from './index.vue'
import { ref, shallowRef } from 'vue'
defineOptions({
  name: 'BsgoalBaseTagDemo'
})
const props = defineProps({})

const options = shallowRef([
  {
    label: 'tag1',
    value:'tag1',
    checked: false
  },
  {
    label: 'tag2',
    value: 'tag2',
    checked: false
  },
  {
    label: 'tag3',
    value: 'tag3',
    checked: false
  },
  {
    label: 'tag4',
    value: 'tag4',
    checked: false
  },
  {
    label: 'tag5',
    value: 'tag5',
    checked: true
  },
])

const changeTags = (values = [],options = [],) => {
  console.log('options',options);
  console.log('values',values);
}
</script>
<template>
  <div class="bsgoal-base-tag-demo">
    <BsgoalBaseTag label="愚蠢的地球人"></BsgoalBaseTag>
    <BsgoalBaseTag closable>愚蠢的地球人</BsgoalBaseTag>
    <BsgoalBaseTag round>愚蠢的地球人</BsgoalBaseTag>
    <BsgoalBaseTag type="warning">愚蠢的地球人</BsgoalBaseTag>
    <BsgoalBaseTag>愚蠢的地球人</BsgoalBaseTag>
    <BsgoalBaseTag :options="options" @on-change="changeTags" ></BsgoalBaseTag>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-tag-demo {
}
</style>

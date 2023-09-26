<!--
 * @Author: canlong.shen
 * @Date: 2023-09-20 16:38:11
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-26 14:05:07
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-overview\demo.vue
 * @Description: 数据概率 - 演示
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import BsgoalBaseOverview from './index.vue'
import { ref ,shallowRef } from 'vue'
defineOptions({
  name: 'BsgoalBaseOverviewDemo'
})
const props = defineProps({})
const options = shallowRef([
    {
        title:'事件总数事件',
        icon:'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_event.svg',
        data:3423, 
    },
    {
        title:'今天',
        icon:'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_today.svg' ,
        data:546, 
    },
    {
        title:'昨天 ',
        icon:'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_yesterday.svg',
        data:243, 
    },
    {
        title:'环比昨日 ',
        icon:'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_ring%20ratio.svg',
        data:'0.00%', 
    },
    {
        title:'昨天 ',
        icon:'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_yesterday.svg',
        data:243, 
    },
    {
        title:'环比昨日 ',
        icon:'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_ring%20ratio.svg',
        data:'0.00%', 
    },
])
</script>
<template>
  <div class="bsgoal-base-overview-demo">
    <BsgoalBaseOverview :options="options"></BsgoalBaseOverview>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-overview-demo {
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-15 13:49:25
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-18 18:12:06
 * @FilePath: \common\src\components\bsgoal-base-table-content\index.vue
 * @Description: 表格内容 
 * 
-->

<script>
export default {
    name: "BsgoalBaseTableContent",
};
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue';
// props
const props = defineProps({
    data: {
        type: [String,Number,Object,Number,Boolean],
        default: ''
    }
})
</script>
<template>
    <div class="bsgoal-base-table-content">
        <div class="bas_tabl_content">
            {{ data }}
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


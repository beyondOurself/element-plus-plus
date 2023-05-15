<!--
 * @Author: canlong.shen
 * @Date: 2023-04-15 13:49:25
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-15 14:26:22
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
import BsgoalBaseTooltip from '../bsgoal-base-tooltip/index.vue'
// props
const props = defineProps({
    /**
     * 数据
     */
    data: {
        type: [String, Number, Object, Boolean],
        default: ''
    },

    /**
     * 内容提示
     */
    tooltip: {
        type: [Boolean, Number],
        default: false
    },

    /**
     * 内容限定数
     */
    limit: {
        type: [Number],
        default: 10
    },

})
</script>
<template>
    <div class="bsgoal-base-table-content">
        <div class="base_table_content">
            <BsgoalBaseTooltip v-if="tooltip" :content="data" :limit="limit" />
            <div v-else class="base_table_table_txt">
                {{ data }}

            </div>
        </div>
    </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-table-content {}
</style>


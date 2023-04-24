<!--
 * @Author: canlong.shen
 * @Date: 2023-04-13 09:38:19
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-15 10:08:27
 * @FilePath: \common\src\components\bsgoal-base-search\demo.vue
 * @Description: 表格查询组件演示
 * 
-->

<script>
export default {
    name: "BsgoalBaseSearchDemo",
};
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue';
import BsgoalBaseSearch from './index.vue'
import EnumType from '../../enums/enumType.js'

// props
const props = defineProps({

})
let curLocalOptions = ref([
    {
        label: 'prop1',
        // value: '111',
        prop: 'prop1',
        type: EnumType.INPUT,
    },
    {
        label: 'prop2',
        value: 'select2',
        type: EnumType.SELECT,
        prop: 'prop2',
        range: [
            {
                label: 'select1',
                value: 'select1'
            },
            {
                label: 'select2',
                value: 'select2'
            },
            {
                label: 'select3',
                value: 'select3'
            },
            {
                label: 'select4',
                value: 'select5'
            },
        ]

    },
    {
        label: 'prop3',
        // value: '111',
        type: EnumType.SLIDER,
        prop: 'prop3'

    },
    {
        label: 'prop4',
        // value: '111',
        type: EnumType.SWITCH,
        prop: 'prop4'

    },
    {
        label: 'prop5',
        // value: '111',
        type: EnumType.RADIO,
        prop: 'prop5',
        range: [
            {
                label: 'radio1',
                value: "radio1"
            },
            {
                label: 'radio2',
                value: "radio2"
            },
        ],

    },
    {
        label: 'prop6',
        value: [],
        type: EnumType.CHECKBOX,
        prop: 'prop6',
        range: [
            {
                label: 'checkbox1',
                value: "checkbox1"
            },
            {
                label: 'checkbox2',
                value: "checkbox2"
            },
        ],

    },
    {
        label: 'prop7',
        // value: '111',
        type: EnumType.DATE,
        prop: 'prop7',
        format: 'YYYY-MM-DD'

    },
    // {
    //     label: 'prop8',
    //     // value: '111',
    //     type: EnumType.WEEK,
    //     prop: 'prop8'

    // },
    {
        label: 'prop9',
        // value: '111',
        type: EnumType.MONTH,
        prop: 'prop9'

    },
    {
        label: 'prop10',
        // value: '111',
        type: EnumType.YEAR,
        prop: 'prop10'

    },
    {
        label: 'prop11',
        // value: '111',
        type: EnumType.DATE_RANGE,
        prop: 'prop11',
        range: ['startDate', 'endDate']
    },
    {
        label: 'prop12',
        // value: '111',
        type: EnumType.MONTH_RANGE,
        prop: 'prop12'
    },
    {
        label: 'prop13',
        // value: '111',
        type: EnumType.TIME,
        prop: 'prop13'
    },
    {
        label: 'prop14',
        // value: '111',
        type: EnumType.TIME_RANGE,
        prop: 'prop14'
    },
    {
        label: 'prop15',
        // value: '111',
        type: EnumType.DATE_TIME,
        prop: 'prop15'
    },
    {
        label: 'prop16',
        // value: '111',
        type: EnumType.DATE_TIME_RANGE,
        prop: 'prop16'
    },
])
const test = () => {
    curLocalOptions.value = [111]
}


const curInputModel = ref({
    prop: '1'
})

</script>
<template>
    <div class="bsgoal-base-search_demo">
        <BsgoalBaseSearch :config-options="curLocalOptions" />
        <el-button @click="test">点击按钮</el-button>
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

<!--
 * @Author: canlong.shen
 * @Date: 2023-05-10 13:40:36
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-10 13:55:15
 * @FilePath: \common\src\components\bsgoal-base-link\index.vue
 * @Description: 链接 公共组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue';

defineOptions({
  name: 'BsgoalBaseLink'
})

const props = defineProps({
    /**
     * 内容
     */
    content: {
        type: [String],
        default: 'link'
    },
    /**
     * 是否下划线
     */
    underline: {
        type: [Boolean],
        default: false
    },
    /**
     * style 对象
     */
    styler: {
        type: [Object],
        default: () => ({})
    }
})

const emits = defineEmits(['on-click'])

/**
 * @Author: canlong.shen
 * @description: 点击链接
 * @default: 
 * @return {*}
 */
const clickLink = () => {
    emits('on-click')
}



</script>
<template>
    <div class="bsgoal-base-link">
        <el-link class="bsgoal_base_link" type="primary" :underline="underline" :style="styler" @click="clickLink">
            <slot>{{ content }}</slot>
        </el-link>
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
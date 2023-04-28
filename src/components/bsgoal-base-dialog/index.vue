<!--
 * @Author: canlong.shen
 * @Date: 2023-04-23 16:35:19
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-28 14:40:14
 * @FilePath: \common\src\components\bsgoal-base-dialog\index.vue
 * @Description:  弹窗公共组件
 * 
-->

<script>
export default {
  name: 'BsgoalBaseDialog'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watch } from 'vue'
// props
const props = defineProps({
  /**
   * 弹窗状态
   */
  modelValue: {
    type: [Boolean],
    default: false
  },
  /**
   * 标题
   */
  title: {
    type: [String],
    default: '标题'
  },
  /**
   * 取消的文本
   */
  cancelTxt: {
    type: [String],
    default: '取消'
  },
  /**
   * 确定的文本
   */
  confirmTxt: {
    type: [String],
    default: '确定'
  }, 
 /**
   * 宽度
   */
  width:{
    type:[String,Number]
  }

})

const emits = defineEmits(['update:modelValue', 'on-confirm'])
const dialogVisible = ref(props.modelValue.value)

/**
 * @Author: canlong.shen
 * @description: 取消弹窗
 * @default:
 * @return {*}
 */
const cancel = () => {
  dialogVisible.value = false
}
/**
 * @Author: canlong.shen
 * @description: 确定弹窗
 * @default:
 * @return {*}
 */
const confirm = () => {
  dialogVisible.value = false
  emits('on-confirm')
}

watch(
  () => props.modelValue,
  (v) => {
    dialogVisible.value = v
  }
)

watch(dialogVisible, (v) => {
  emits('update:modelValue', v)
})
</script>
<template>
  <div class="bsgoal-base-dialog">
    <div class="base_dialog">
      <!-- S 组件实体 -->
      <el-dialog v-model="dialogVisible" custom-class="bsgoal_base_dialog_main" :width="width">
        <template #header>
          <div class="base_dialog_header">{{ title }}</div>
        </template>
        <div class="base_dialog_content">
          <slot></slot>
        </div>
        <template #footer>
          <span class="base_dialog_footer">
            <el-button @click="cancel">{{ cancelTxt }}</el-button>
            <el-button type="primary" @click="confirm"> {{ confirmTxt }} </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- E 组件实体 -->
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-dialog {
  .base_dialog_header {
    font-weight: 500;
    color: #303133;
    font-size: 16px;
  }

  .bsgoal_base_dialog_main {
    .el-dialog__header {
      padding: 16px 30px;
      margin-right: 0px;
      background-color: #f5f7fa;
      .el-dialog__headerbtn {
        top: 0px;
        right: 8px;
      }
    }
    .el-dialog__body {
      padding: 0px 0px 30px 30px;
    }
  }
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-23 16:35:19
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-14 09:40:30
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-dialog\index.vue
 * @Description:  弹窗公共组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watch, computed } from 'vue'
import BsgoalBaseButton from '../bsgoal-base-button/index.vue'

defineOptions({
  name: 'BsgoalBaseDialog'
})

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
  width: {
    type: [String, Number]
  },
  /**
   * 弹窗类型
   */
  type: {
    type: [String],
    default: 'default',
    validator: (v) => ['default', 'form', 'blank'].includes(v)
  },
  /**
   * 弹窗大小
   */
  size: {
    type: [String, Number],
    default: 'medium',
    validator: (v) => ['small', 'medium', 'lagre', 'max', 'dnymic'].includes(v)
  },
  /**
   * 是否显示 底部 内容
   */
  footer: {
    type: [Boolean],
    default: true
  },
  /**
   * 是否重新渲染整个视图
   */
  isRefresh: {
    type: [Boolean],
    default: true
  },
  /**
   * 弹窗的上边距
   */
  top: {
    type: [String],
    default: '10vh'
  }
})

const emits = defineEmits(['update:modelValue', 'on-confirm', 'on-show', 'on-hide'])
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
const confirm = (done = () => {}) => {
  emits('on-confirm', (close = true) => {
    if (close) {
      dialogVisible.value = false
    }
    done()
  })
}

watch(
  () => props.modelValue,
  (v) => {
    dialogVisible.value = v
  }
)

watch(dialogVisible, (v) => {
  emits('update:modelValue', v)
  if (v) {
    emits('on-show', v)
  } else {
    emits('on-hide', v)
  }
})

//  设置不同尺寸

const widthGet = computed(() => {
  const { width, size } = props

  if (width) {
    return width
  }

  switch (size) {
    case 'small':
      return '480px'
    case 'medium':
      return '720px'
    case 'lagre':
      return '960px'
    case 'max':
      return '1232px'
    case 'dnymic':
      return '80%'
    default:
      return width
  }
})

const show = () => {
  dialogVisible.value = true
}

const hide = () => {
  dialogVisible.value = false
}

// ---> S 暴露属性  <---
defineExpose({
  show,
  hide
})
// ---> E 暴露属性  <---
</script>
<template>
  <div class="bsgoal-base-dialog">
    <div class="base_dialog">
      <!-- S 组件实体 -->
      <el-dialog
        v-model="dialogVisible"
        custom-class="bsgoal_base_dialog_main"
        :class="{ 'bsgoal-dialog__footer--conceal': !footer }"
        :top="top"
        :width="widthGet"
      >
        <template #header>
          <div class="base_dialog_header">{{ title }}</div>
        </template>
        <div
          :class="[
            'base_dialog_content',
            {
              'base_dialog_content--form': type === 'form',
              'base_dialog_content--blank': type === 'blank'
            }
          ]"
        >
          <slot v-if="dialogVisible && isRefresh"></slot>
        </div>
        <template #footer>
          <slot name="footer" v-if="footer">
            <span class="base_dialog_footer">
              <BsgoalBaseButton
                class="base_dialog_footer_cancel"
                mode="cancel"
                :task="cancel"
                :content="cancelTxt"
                :has-loading="false"
              >
              </BsgoalBaseButton>
              <BsgoalBaseButton mode="confirm" :task="confirm" :content="confirmTxt">
              </BsgoalBaseButton>
            </span>
          </slot>
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

  .bsgoal-dialog__footer--conceal .el-dialog__footer {
    display: none;
  }

  .el-dialog__footer {
    height: initial;
    line-height: initial;
    .el-button {
      margin-left: initial;
    }
  }

  .bsgoal_base_dialog_main {
    .el-dialog__header {
      padding: 16px 30px;
      margin-right: 0px;
      background-color: #f5f7fa;
      height: initial !important;
      .el-dialog__headerbtn {
        top: 0px;
        right: 8px;
      }
    }

    .el-dialog__body {
      padding: 0px;
    }

    .base_dialog_content {
      padding: 30px;
    }

    .base_dialog_content--form {
      padding: 0px 0px 0px 30px;

      .bsgoal-base-form .base_form {
        padding: initial;
        padding-top: 16px;
      }
    }

    .base_dialog_content--blank {
      padding-top: 0px;
    }
  }
  .base_dialog_footer_cancel {
    margin-right: 16px;
  }
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-05-18 16:24:25
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-13 15:16:33
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-button\index.vue
 * @Description: 统一按钮 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, unref, computed, nextTick, toValue } from 'vue'
import { Delete, Plus, CloseBold, Select } from '@element-plus/icons-vue'
import iconMap from './assets/map-icon.js'
import BsgoalBaseIcon from '../bsgoal-base-icon/index.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

defineOptions({
  name: 'BsgoalBaseButton'
})

const props = defineProps({
  task: {
    type: [Object, Function],
    default: () => {
      Promise.resolve()
    }
  },
  type: {
    type: [String],
    default: '',
    validator: (v) => ['primary', 'success', 'warning', 'danger', 'info'].includes(v)
  },
  icon: {
    type: [String, Object, Boolean],
    default: ''
  },
  content: {
    type: [String],
    default: ''
  },
  mode: {
    type: [String],
    default: 'default',
    validator: (v) => ['add', 'delete', 'edit', 'detail', 'default', 'cancel'].includes(v)
  },
  values: {
    type: [Array, Object],
    default: () => ({})
  },
  plain: {
    type: [Boolean],
    default: false
  },
  /**
   * 是否有 loading
   */
  hasLoading: {
    type: [Boolean],
    default: true
  },
  /**
   * disabled
   */
  disabled: {
    type: [Boolean],
    default: false
  },
  /**
   * circle
   */
  circle: {
    type: [Boolean],
    default: false
  },

  /**
   *  确认
   */
  hasConfirm: {
    type: [Boolean],
    default: false
  },
  /**
   * 确认框内容
   */
  title: {
    type: [String],
    default: '是否删除!'
  },
  /**
   * 自定义图标路径
   */
  url: {
    type: [String],
    default: ''
  },
  /**
   * 链接按钮
   */
  link: {
    type: [Boolean],
    default: false
  },
  /**
   * tooltip 提示文字
   */
  tooltip: {
    type: [String],
    default: ''
  },
  /**
   * tooltip 内容宽度
   */
  tooltipWidth: {
    type: [String, Number],
    default: 400
  },
  /**
   * placement
   */
  tooltipPlacement: {
    type: [String],
    default: 'top'
  },
  /**
   * 气泡确认框内容的宽度
   */
  confirmWidth: {
    type: [String, Number],
    default: ''
  }
})

// ---> S 触发按钮 <---
const loading = ref(false)
const triggerClick = () => {
  const { disabled = false } = props
  const disabledValue = toValue(disabled)
  if (disabledValue) {
    return
  }

  // 默认 loading 是打开的
  if (props.hasLoading) {
    loading.value = true
  }
  const { task } = props
  const taskValue = unref(task)
  taskValue(() => {
    loading.value = false
  }, props.values)
}
// ---> E 触发按钮 <---

// ---> S 模式 <---

const getIconMapproperty = (prop = '') => {
  const { mode = '' } = props
  const mapModeConfig = iconMap[mode]
  if (mapModeConfig && mapModeConfig[prop]) {
    return mapModeConfig[prop]
  }
  return ''
}

const typeGet = computed(() => {
  const { mode = '', type = '' } = props

  switch (mode) {
    case 'delete':
      return 'danger'
    case 'cancel':
      return ''
    case 'confirm':
    case 'add':
    case 'edit':
      return 'primary'
  }
  const typeValue = getIconMapproperty('type')
  return type || typeValue
})
const iconGet = computed(() => {
  const { mode = '', icon = '' } = props

  if (icon !== false) {
    switch (mode) {
      case 'delete':
        return Delete
      case 'add':
        return Plus
      case 'cancel':
        return CloseBold
      case 'confirm':
        return Select
    }
  }

  return icon
})
const contentGet = computed(() => {
  const { mode = '', content = '' } = props

  if (content) {
    return content
  }
  switch (mode) {
    case 'cancel':
      return '取消'
    case 'confirm':
      return '确认'
    case 'add':
      return '新增'
    case 'edit':
      return '编辑'
    case 'delete':
      return '删除'
    case 'detail':
      return '详情'
  }

  const contentValue = getIconMapproperty('content')

  return contentValue || content
})

// ---> E 模式 <---

const iconUrlGet = computed(() => {
  const { url = '' } = props
  const svgUrl = getIconMapproperty('icon')
  return url || svgUrl
})
const curIconColor = ref('')
const EL_BUTTON_REF = ref(null)
const setIconColor = (resetPrimary = false) => {
  const { plain = false } = props
  const type = typeGet.value
  nextTick(() => {
    if (type === 'primary' && plain && resetPrimary) {
      curIconColor.value = 'var(--el-color-primary)'
    } else {
      const buttonEl = EL_BUTTON_REF.value
      if (buttonEl) {
        const elIconEl = buttonEl.querySelector('.el-button')
        setTimeout(() => {
          const colorValue = window.getComputedStyle(elIconEl, null).getPropertyValue('color')
          curIconColor.value = colorValue
        }, 50)
      }
    }
  })
}

setIconColor(true)
const mouseenter = () => {
  setIconColor()
}
const mouseleave = () => {
  setIconColor(true)
}

const tooltipStyleGet = computed(() => {
  const styler = {}
  const { tooltipWidth = 0 } = props

  if (tooltipWidth) {
    styler.width = Number.isInteger(tooltipWidth) ? `${tooltipWidth}px` : tooltipWidth
  }
  return styler
})
</script>
<template>
  <div class="bsgoal-base-button">
    <el-config-provider :locale="zhCn">
      <template v-if="hasConfirm && !disabled">
        <div class="base_button">
          <el-popconfirm :title="title" :width="confirmWidth" @confirm="triggerClick">
            <template #reference>
              <slot :loading="loading">
                <el-button
                  :link="link"
                  :type="typeGet"
                  :icon="iconGet"
                  :loading="loading"
                  :plain="plain"
                  :disabled="disabled"
                  :circle="circle"
                >
                  {{ contentGet }}
                  <template #icon v-if="iconUrlGet">
                    <BsgoalBaseIcon width="1.2em" :src="iconUrlGet" :color="curIconColor" />
                  </template>
                </el-button>
              </slot>
            </template>
          </el-popconfirm>
        </div>
      </template>
      <template v-else>
        <div class="base_button" ref="EL_BUTTON_REF" @click="triggerClick">
          <el-tooltip
            effect="light"
            :disabled="!tooltip"
            :content="tooltip"
            :placement="tooltipPlacement"
            :circle="circle"
          >
            <template #content>
              <div class="base_button_tooltip" :style="tooltipStyleGet">
                <el-input :model-value="tooltip" autosize type="textarea" readonly />
              </div>
            </template>

            <slot :loading="loading">
              <el-button
                :class="{ base_button_body: circle }"
                :link="link"
                :type="typeGet"
                :icon="iconGet"
                :loading="loading"
                :plain="plain"
                :disabled="disabled"
                :url="url"
                :circle="circle"
                @mouseenter="mouseenter"
                @mouseleave="mouseleave"
              >
                {{ contentGet }}
                <template #icon v-if="iconUrlGet">
                  <BsgoalBaseIcon
                    style="font-size: 0"
                    width="1.2em"
                    :src="iconUrlGet"
                    :color="curIconColor"
                  />
                </template>
              </el-button>
            </slot>
          </el-tooltip>
        </div>
      </template>
    </el-config-provider>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-button {
  &,
  .base_button {
    display: inline-block;
  }
  .base_button_tooltip {
    word-wrap: break-word;
    word-break: break-all;
  }
  .base_button_body > span {
    display: none;
  }
}
</style>

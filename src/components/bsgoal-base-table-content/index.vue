<!--
 * @Author: canlong.shen
 * @Date: 2023-04-15 13:49:25
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-21 10:12:59
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-table-content\index.vue
 * @Description: 表格内容 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref , computed } from 'vue'
import BsgoalBaseTooltip from '../bsgoal-base-tooltip/index.vue'

defineOptions({
  name: 'BsgoalBaseTableContent'
})

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

  /**
   * 配置项
   */
  option: {
    type: [Object],
    default: () => ({})
  }
})

const dataGet = computed(() => {
  const {
    option: { label = '' ,desensitize =false},
    data = ''
  } = props


  if (data && desensitize) {
    if (/.*(电话|手机)(号码|号).*/.test(label)) {
      return `${data}`.replace(/^([0-9]{3})[0-9]{4}(.*)/, '$1****$2')
    }
    if(/.*(身份证)(号码|号).*/.test(label)){
        return `${data}`.replace(/^([A-Za-z0-9]{6})[0-9]{4}(.*)/, '$1******$2')
    }
  }
  return data
})
</script>
<template>
  <div class="bsgoal-base-table-content">
    <div class="base_table_content">
      <BsgoalBaseTooltip v-if="tooltip" :content="dataGet" :limit="limit" />
      <div v-else class="base_table_table_txt">
        {{ dataGet }}
      </div>
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-table-content {
  display: inline-block;
}
</style>

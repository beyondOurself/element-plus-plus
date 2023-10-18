<!--
 * @Author: canlong.shen
 * @Date: 2023-09-20 16:37:46
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-18 19:29:44
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-overview\index.vue
 * @Description: 数据概率
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, shallowRef, nextTick, onUnmounted } from 'vue'
import BsgoalBaseLine from '../bsgoal-base-line/index.vue'
import { tagEmits } from 'element-plus'

defineOptions({
  name: 'BsgoalBaseOverview'
})
const props = defineProps({
  /**
   * 配置项
   */
  options: {
    type: [Array],
    default: () => []
  }
})

const isMin = ref(false)

const calcSize = () => {
  nextTick(() => {
    const innerWidthValue = window.innerWidth
    if (innerWidthValue < 1500) {
      isMin.value = true
    } else {
      isMin.value = false
    }
  })
}

calcSize()

window.addEventListener('resize',  calcSize)

onUnmounted(() => {
  window.removeEventListener('resize',calcSize)
})

const emits = defineEmits(['on-click-item'])
const handleItem = (option) => {
  emits('on-click-item', option)
}
</script>
<template>
  <div class="bsgoal-base-overview">
    <div class="base_overview">
      <template v-for="(option, key) of options" :key="key">
        <div class="base_overview_item" @click="handleItem(option)">
          <!-- S 图标 -->
          <div class="overview_item_icon">
            <img :src="option.icon" style="width: 52px" />
          </div>
          <!-- E 图标 -->

          <template v-if="isMin">
            <div style="margin-right: 20px">
              <!-- S 数据  -->
              <div class="overview_item_data">
                {{ option.data }}
              </div>
              <!-- E 数据  -->
              <div class="overview_item_gap"></div>
              <!-- S 标题 -->
              <div class="overview_item_title" style="margin-right: 0px;">
                {{ option.title }}
              </div>
            </div>
          </template>
          <template v-else>
            <!-- S 数据  -->
            <div class="overview_item_data">
              {{ option.data }}
            </div>
            <!-- E 数据  -->
            <div class="overview_item_gap"></div>
            <!-- S 标题 -->
            <div class="overview_item_title">
              {{ option.title }}
            </div>
          </template>

          <!-- E 标题 -->
        </div>
        <div class="base_overview_item_gap" v-if="key !== options.length - 1"></div>
      </template>
    </div>
    <!-- / 分割线 -->
    <BsgoalBaseLine />
    <!-- / 分割线 -->
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-overview {
  .base_overview {
    display: flex;
    padding: 6px 16px;
    background-color: #fff;
  }

  .base_overview_item_gap {
    width: 16px;
  }

  .base_overview_item {
    height: 88px;

    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;

    background: #fafafa;
    border-radius: 8px;

    text-align: right;
  }
  .overview_item_data {
    font-size: 32px;
    font-weight: 500;
    color: #303133;
    flex: 18;
  }
  .overview_item_icon {
    flex: auto;
    display: flex;
    margin-left: 20px;
  }

  .overview_item_gap {
    flex: 1;
  }

  .overview_item_title {
    margin-right: 20px;
    color: #909399;
    font-size: 13px;
    flex: auto;
  }
}
</style>

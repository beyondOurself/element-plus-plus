<!--
 * @Author: canlong.shen
 * @Date: 2023-09-20 16:37:46
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-20 17:32:50
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-overview\index.vue
 * @Description: 数据概率
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, shallowRef } from 'vue'
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
</script>
<template>
  <div class="bsgoal-base-overview">
    <div class="base_overview">
      <template v-for="(option, key) of options" :key="key">
        <div class="base_overview_item">
          <!-- S 图标 -->
          <div class="overview_item_icon">
            <img :src="option.icon" />
          </div>
          <!-- E 图标 -->
          <!-- S 数据  -->
          <div class="overview_item_data">
            {{ option.data }}
          </div>

          <!-- E 数据  -->
          <!-- S 标题 -->
          <div class="overview_item_title">
            {{ option.title }}
          </div>

          <!-- E 标题 -->
        </div>
        <div class="base_overview_item_gap" v-if="key !== options.length - 1"></div>
      </template>
    </div>
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
    flex: 12;
  }
  .overview_item_icon {
    margin-left: 20px;
  }
  .overview_item_title {
    margin-right: 20px;
    color: #909399;
    font-size: 13px;
    flex: 5;
  }
}
</style>

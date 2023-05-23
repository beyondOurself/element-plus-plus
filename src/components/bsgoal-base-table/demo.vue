<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 14:26:44
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-19 14:39:05
 * @FilePath: \common\src\components\bsgoal-base-table\demo.vue
 * @Description: 表格公共组件演示页面
 * 
-->
<script>
export default {
  name: 'BsgoalBaseTableDemo'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, toRefs, watch, unref } from 'vue'

import BsgoalBaseTable from './index.vue'
import BsgoalBaseSearch from '../bsgoal-base-search/index.vue'
import ComponentTypeEnums from '../../enums/componentTypeEnums.js'
let searchOptions = ref([
  {
    label: 'prop1',
    // value: '111',
    prop: 'prop1',
    type: ComponentTypeEnums.INPUT
  },
  {
    label: 'prop2',
    value: 'select2',
    type: ComponentTypeEnums.SELECT,
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
      }
    ]
  },
  {
    label: 'prop3',
    // value: '111',
    type: ComponentTypeEnums.SLIDER,
    prop: 'prop3'
  },
  {
    label: 'prop4',
    // value: '111',
    type: ComponentTypeEnums.SWITCH,
    prop: 'prop4'
  },
  {
    label: 'prop5',
    // value: '111',
    type: ComponentTypeEnums.RADIO,
    prop: 'prop5',
    range: [
      {
        label: 'radio1',
        value: 'radio1'
      },
      {
        label: 'radio2',
        value: 'radio2'
      }
    ]
  },
  {
    label: 'prop6',
    value: [],
    type: ComponentTypeEnums.CHECKBOX,
    prop: 'prop6',
    range: [
      {
        label: 'checkbox1',
        value: 'checkbox1'
      },
      {
        label: 'checkbox2',
        value: 'checkbox2'
      }
    ]
  },
  {
    label: 'prop7',
    // value: '111',
    type: ComponentTypeEnums.DATE,
    prop: 'prop7',
    format: 'YYYY-MM-DD'
  },
  // {
  //     label: 'prop8',
  //     // value: '111',
  //     type: ComponentTypeEnums.WEEK,
  //     prop: 'prop8'

  // },
  {
    label: 'prop9',
    // value: '111',
    type: ComponentTypeEnums.MONTH,
    prop: 'prop9'
  },
  {
    label: 'prop10',
    // value: '111',
    type: ComponentTypeEnums.YEAR,
    prop: 'prop10'
  },
  {
    label: 'prop11',
    // value: '111',
    type: ComponentTypeEnums.DATE_RANGE,
    prop: 'prop11',
    range: ['startDate', 'endDate']
  },
  {
    label: 'prop12',
    // value: '111',
    type: ComponentTypeEnums.MONTH_RANGE,
    prop: 'prop12'
  },
  {
    label: 'prop13',
    // value: '111',
    type: ComponentTypeEnums.TIME,
    prop: 'prop13'
  },
  {
    label: 'prop14',
    // value: '111',
    type: ComponentTypeEnums.TIME_RANGE,
    prop: 'prop14'
  },
  {
    label: 'prop15',
    // value: '111',
    type: ComponentTypeEnums.DATE_TIME,
    prop: 'prop15'
  },
  {
    label: 'prop16',
    // value: '111',
    type: ComponentTypeEnums.DATE_TIME_RANGE,
    prop: 'prop16'
  }
])
const data = ref([])

setTimeout(() => {
  data.value = [
    {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: 'prop3',
      prop4: 'prop4',
      prop5: 'prop5',
      prop6: 'prop6'
    },
    {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: 'prop3',
      prop4: 'prop4',
      prop5: 'prop5',
      prop6: 'prop6'
    },
    {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: 'prop3',
      prop4: 'prop4',
      prop5: 'prop5',
      prop6: 'prop6'
    },
    {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: 'prop3',
      prop4: 'prop4',
      prop5: 'prop5',
      prop6: 'prop6'
    },
    {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: 'prop3',
      prop4: 'prop4',
      prop5: 'prop5',
      prop6: 'prop6'
    },
    {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: 'prop3',
      prop4: 'prop4',
      prop5: 'prop5',
      prop6: 'prop6'
    }
  ]
}, 3000)

const configOptionsTable = ref([
  {
    label: '列列列列列列列列列1',
    prop: 'prop1',
    // tooltip: true,
    // limit: 3
  },
  {
    label: '列列列列列列列列列2',
    prop: 'prop2'
  },
  {
    label: '列列列列列列列列列3',
    prop: 'prop3'
  },
  {
    label: '列列列列列列列列列4',
    prop: 'prop4'
  },
  {
    label: '列列列列列列列列列5',
    prop: 'prop5'
  },
  {
    label: '列列列列列列列列列6',
    prop: 'prop6'
  }
])

const clearData = () => {
  data.value = []
}
</script>
<template>
  <div class="bsgoal-base-table-demo">
    <!-- <BsgoalBaseSearch  :config-options="searchOptions" /> -->
    <el-button type="primary" @click="clearData">设置为空数据</el-button>
    <BsgoalBaseTable
      operation-width="200"
      operation
      selection
      :has-page="false"
      :config-options="configOptionsTable"
      :data="data"
      :auto-height="false"
    >
      <!-- S 操作项 -->
      <template v-slot:operation="{ row }">
        <div>
          {{ row }}
        </div>
      </template>
      <!-- E 操作项 -->
    </BsgoalBaseTable>
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

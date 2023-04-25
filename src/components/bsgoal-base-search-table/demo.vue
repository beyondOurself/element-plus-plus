<!--
 * @Author: canlong.shen
 * @Date: 2023-04-18 17:04:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-25 11:28:19
 * @FilePath: \common\src\components\bsgoal-base-search-table\demo.vue
 * @Description: 查询 + 表格 组合公共组件
 * 
-->

<script>
export default {
  name: 'BsgoalSearchTableDemo'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref ,unref } from 'vue'
import EnumType from '../../enums/enumType.js'
import BsgoalBaseSearchTable from './index.vue'
import DemoTable from './demo-table.vue'
// props
const props = defineProps({})

const configOptions = ref([
  {
    label: 'prop1',
    // value: '111',
    prop: 'prop1',
    type: EnumType.INPUT,
    width: '100px'
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
      }
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
    type: EnumType.CHECKBOX,
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
    type: EnumType.DATE,
    prop: 'prop7',
    format: 'YYYY-MM-DD'
  },
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
  }
])

const tableData = ref([
  {
    prop1: 'row1value',
    prop2: 'row1value',
    prop3: 'row1value',
    prop4: 'row1value',
    prop5: 'row1value',
    prop6: 'row1value',
    prop7: 'row1value',
    prop8: 'row1value',
    prop9: 'row1value',
    prop10: 'row1value',
    prop11: 'row1value',
    prop12: 'row1value',
    prop13: 'row1value',
    prop14: 'row1value',
    prop15: 'row1value',
    prop16: 'row1value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  }
])

const call = (state, data) => {
   console.log('call state',state);
   console.log('call data',data);
}

const tableDataVal = unref(tableData)

const fetch = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
         rows:tableDataVal,
         total: tableDataVal.length
        },
        message: '获取数据成功'
      })
    }, 3000)
  })
}
</script>
<template>
  <div class="bsgoal-search-table-demo">
    <div class="search_table_demo">
      <!-- <DemoTable /> -->
      <BsgoalBaseSearchTable
        selection
        operation
        :call="call"
        :fetch="fetch"
        :config-options="configOptions"
        :expression="200" 
        @on-search="triggerSearch"
      >
        <template v-slot:menu>
          <el-button type="primary">操作按钮</el-button>
        </template>
        <template v-slot:operation>
          <el-button type="primary">编辑</el-button>
        </template>
      </BsgoalBaseSearchTable>
    </div>
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

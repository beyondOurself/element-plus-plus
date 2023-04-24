<!--
 * @Author: canlong.shen
 * @Date: 2023-04-15 16:34:57
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-19 17:54:55
 * @FilePath: \common\src\components\bsgoal-base-table-pagination\index.vue
 * @Description: 表格的分页按钮
 * 
-->

<script>
export default {
  name: 'BsgoalBaseTablePagination'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// props
const props = defineProps({
  /**
   * 当前页数
   */
  currentPage: {
    type: [Number],
    default: 1
  },
  /**
   * 可选页数集合
   */
  pageSizes: {
    type: [Array],
    default: () => [10, 20, 30, 40, 50, 100]
  },
  /**
   * 每页显示条目个数
   */
  pageSize: {
    type: [Number],
    default: 10
  },
  /**
   * 总条目
   */
  total: {
    type: [Number],
    default: 0
  }
})

const emits = defineEmits(['on-size-change', 'on-current-change'])

/**
 * @Author: canlong.shen
 * @description: page-size 改变时触发
 * @default:
 * @return {*}
 */
const triggerSizeChange = (size = 0) => {
  emits('on-size-change', size)
}
/**
 * @Author: canlong.shen
 * @description: current-change
 * @default:
 * @return {*}
 */
const triggerCurrentChange = (current = 1) => {
  emits('on-current-change', current)
}
const page = ref(1)
</script>
<template>
  <div class="bsgoal-base-table-pagination">
    <div class="base_table_pagination">
      <el-config-provider :locale="zhCn">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          v-model:current-page="page"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :total="total"
          @size-change="triggerSizeChange"
          @current-change="triggerCurrentChange"
        >
          <template v-slot:next>
            <span>总数</span>
          </template>
        </el-pagination>
      </el-config-provider>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
.bsgoal-base-table-pagination {
  text-align: right;
}
.base_table_pagination {
  display: inline-block;
  margin-top: 16px;
}
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

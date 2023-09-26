<!--
 * @Author: canlong.shen
 * @Date: 2023-09-22 17:51:19
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-26 14:40:44
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-list\index.vue
 * @Description: 列表组件 
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, computed, nextTick } from 'vue'
import directiveBase from '../../directives/directiveBase.js'
import BsgoalBaseSearch from '../bsgoal-base-search/index.vue'
defineOptions({
  name: 'BsgoalBaseList'
})
const props = defineProps({
  configOptions: {
    type: [Array],
    default: () => []
  },

  /**
   * 请求的 promise
   */
  fetch: {
    type: [Object, Function],
    default: null
  },
  /**
   * 响应的 call
   */
  call: {
    type: [Object, Function],
    default: null
  },
  /**
   * 映射字段
   */
  mapProps: {
    type: [Object],
    default: () => ({
      currentPage: 'currentPage',
      pageSize: 'pageSize',
      rows: 'rows',
      total: 'total'
    })
  },
  /**
   * 是否显示查询
   */
  hasSearch: {
    type: Boolean,
    default: true
  },
  /**
   * 中屏设备宽度的比例
   */
  medium: {
    type: [Number, String],
    default: 6
  },
  /**
   * 列表项间隔
   */
  gutter: {
    type: [Number],
    default: 10
  },
  /**
   * 列表的 中屏设备宽度的比例
   */
  listMd: {
    type: [Number],
    default: 6
  },
  /**
   * 底边距
   */
  bottom: {
    type: [Number],
    default: 20
  },
  /**
   * 节流时延迟
   */
  delay: {
    type: [Number],
    default: 200
  },
  /**
   * 分页数
   */
  pageSize: {
    type: [Number],
    default: 20
  }
})

const emits = defineEmits(['on-change', 'on-clear'])

// ---> S 查询 <---

const BSGOAL_BASE_SEARCH_REF = ref(null)
const refresh = () => {
  BSGOAL_BASE_SEARCH_REF.value.triggerOperationSearch()
}
const getSearchParams = () => {
  const searchParamsValue = BSGOAL_BASE_SEARCH_REF.value.triggerOperationSearch(false)
  return { ...searchParamsValue }
}
const triggerSearch = (searchParams) => {
  curPage.value = 1
  curList.value = []
  loadData(searchParams)
}

const triggerClear = (searchParams) => {
  curPage.value = 1
  curList.value = []
  loadData(searchParams)
  emits('on-clear', searchParams)
}

const triggerChange = (changer = {}) => {
  console.log('changer',changer);
  emits('on-change', changer)
}

// ---> E 查询 <---

// ---> S 列表 <---

// 计算高度的指令
const vHeight = directiveBase.height

const itemStylerGet = computed(() => {
  const styler = {}
  const { gutter = 0 } = props
  if (gutter) {
    styler.marginBottom = `${gutter}px`
  }
  return styler
})

const curScrollDisabled = ref(false)
const curList = ref([])
const curTotal = ref(0)
const curPage = ref(1)
const curLoading = ref(false)
const noneGet = computed(() => {
  return !curList.value.length
})

const mapPropsGet = computed(() => {
  const intProps = {
    currentPage: 'currentPage',
    pageSize: 'pageSize',
    rows: 'rows',
    total: 'total'
  }
  const { mapProps = {} } = props

  return { ...intProps, ...mapProps }
})

const loadData = (searchParams = {}) => {
  curLoading.value = true
  const {  pageSize = 20, fetch = null } = props
  const pageParams = {}
  pageParams[mapPropsGet.value['currentPage']] = curPage.value
  pageParams[mapPropsGet.value['pageSize']] = pageSize
  if (!fetch) {
    curLoading.value = false
    return
  }
  fetch({ ...searchParams, ...pageParams }).then((res = {}) => {
    const { code = 0, data = [] } = res
    if (code === 0) {
      const rows = data[mapPropsGet.value['rows']]
      if (Array.isArray(rows) && rows.length) {
        curList.value.push(...rows)
        curTotal.value = curList.value.length
        curPage.value += 1
      }
    }
    curLoading.value = false
  })
}

const loadScroll = () => {
  const loadParams = getSearchParams()
  loadData(loadParams)
}

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

// ---> E 列表 <---

defineExpose({
  refresh,
  getSearchParams
})
</script>
<template>
  <div class="bsgoal-base-list">
    <div class="base_list">
      <!-- S 查询 -->
      <BsgoalBaseSearch
        ref="BSGOAL_BASE_SEARCH_REF"
        v-show="hasSearch"
        :config-options="configOptions"
        :medium="medium"
        @on-search="triggerSearch"
        @on-clear="triggerClear"
        @on-change="triggerChange"
      />
      <!-- E 查询 -->

      <!-- S 列表 -->
      <div
        v-loading="curLoading"
        element-loading-text="加载中..."
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(0,0,0,0)"
        :element-loading-spinner="svg"

      >
        <div
          v-height="bottom"
          v-infinite-scroll="loadScroll"
          :infinite-scroll-immediate="false"
          :infinite-scroll-disabled="curScrollDisabled"
          :infinite-scroll-delay="delay"
          class="base_list_container"
        >
          <el-row :gutter="gutter" style="margin: 0px">
            <template v-for="(item, index) of curList" :key="index">
              <el-col :xs="24" :sm="24" :md="listMd" :lg="listMd">
                <div class="base_list_item" :style="itemStylerGet">
                  <slot name="item" :data="item">
                    {{ index }}
                  </slot>
                </div>
              </el-col>
            </template>
          </el-row>
        </div>
        <div class="base_list_item_none" v-show="noneGet">
          <img
            src="https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/pc-asstes/estate/common/no_content_.svg"
            alt=""
          />
          <div>暂无数据</div>
        </div>
      </div>
      <!-- E 列表 -->
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-list {
  .base_list_container {
    background-color: #f0f2f5;
    // 隐藏掉滚动条
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
    /*滚动条样式*/
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
      width: 20px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
    }
  }

  .base_list_item_none {
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
    bottom: 0;
    margin: auto;
    width: 300px;
    color: #909399;
    text-align: center;
  }
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-21 08:43:33
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-07 11:59:27
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-tree\index.vue
 * @Description: 虚拟化树型结构 公共组件
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watch, watchEffect, computed, nextTick } from 'vue'
import directiveBase from '../../directives/directiveBase.js'
import BsgoalBaseLine from '../bsgoal-base-line/index.vue'
import BsgoalBaseTreeFold from '../bsgoal-base-tree-fold/index.vue'
import { Plus } from '@element-plus/icons-vue'
defineOptions({
  name: 'BsgoalBaseTree'
})

const props = defineProps({
  /**
   * 树结构 的下边距
   */
  gasket: {
    type: [String, Number],
    default: 10
  },
  /**
   * 数据
   */
  treeData: {
    type: [Object, Array],
    default: () => []
  },
  /**
   * 配置
   */
  treeProps: {
    type: [Object],
    default: () => ({
      label: 'label',
      children: 'children',
      disabled: 'disabled',
      isLeaf: 'isLeaf',
      class: 'class'
    })
  },
  /**
   * 懒加载数据方法
   * () => {
   *   return Promise(resolve =>  resolve([]))
   * }
   */
  lazyLoad: {
    type: [Function],
    default: null
  },
  /**
   * 初始化树节点
   * () => {
   *   return Promise(resolve =>  resolve([]))
   * }
   */
  initNode: {
    type: [Function],
    default: null
  },
  /**
   * 节点的 key
   */
  nodeKey: {
    type: [String],
    default: 'key'
  },
  /**
   * 默认展开的节点
   */
  expandedKeys: {
    type: [Array],
    default: () => []
  },
  /**
   * 初始化显示状态
   */
  initShow: {
    type: [Boolean],
    default: false
  }
})

const emits = defineEmits(['on-click', 'on-switch', 'on-add'])

// 计算高度的指令
const vHeight = directiveBase.height

const filterText = ref('')
const EL_TREE_REF = ref(null)

watch(filterText, (val) => {
  EL_TREE_REF.value.filter(val)
})

/**
 * @Author: canlong.shen
 * @description: 过滤节点
 * @param {*} value
 * @param {*} data
 * @default:
 * @return {*}
 */
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}
// 折叠的状态
const foldStatus = ref(true)

const BSGOAL_BASE_TREE_FOLD_REF = ref(null)

nextTick(() => {
  const { initShow = true } = props
  if (!initShow) {
    BSGOAL_BASE_TREE_FOLD_REF.value.triggerFold()
  }
})

/**
 * @Author: canlong.shen
 * @description: 当节点被点击的时候触发
 * @param {*} value 节点点击的节点对象
 * @param {*} node TreeNode 的 node 属性
 * @param {*} TreeNode TreeNode
 * @param {*} event 事件对象
 * @default:
 * @return {*}
 */
const clickNodeTree = (value, node, treeNode, event) => {
  emits('on-click', value, node, treeNode, event)
}

watch(foldStatus, () => {
  emits('on-switch', foldStatus.value)
})

/**
 * @Author: canlong.shen
 * @description:  懒加载数据
 * @param {*} node
 * @param {*} resolve
 * @default:
 * @return {*}
 */
const loadNode = async (node, resolve, props) => {
  if (node.level === 0) {
    const initNodeData = await props.initNode(node)
    return resolve(initNodeData || [])
  } else {
    const lazyNodeData = await props.lazyLoad(node)
    resolve(lazyNodeData || [])
  }
}

const lazyGet = computed(() => {
  const { lazyLoad = null, initNode = null } = props
  if (lazyLoad && initNode) {
    return true
  }
  return false
})

/**
 * @Author: canlong.shen
 * @description: 点击加号图标触发事件
 * @param {*} node
 * @param {*} data
 * @default:
 * @return {*}
 */
const handleItemAdd = (node = null, data = {}) => {
  emits('on-add', { node, data })
}

// 清除掉选中效果
const BASE_TREE_EL = ref(null)
const clearActiveEffects = () => {
  nextTick(() => {
    const treeEL = BASE_TREE_EL.value
    const currentEl = treeEL.querySelector('.el-tree-node.is-current')
    if (currentEl) {
      currentEl.classList.remove('is-current')
    }
  })
}

// 重置选择
const resetChecked = () => {
  clearActiveEffects()
  EL_TREE_REF.value.setCheckedKeys([], false)
}

defineExpose({
  resetChecked
})
</script>
<template>
  <div class="bsgoal-base-tree">
    <div class="base_tree" v-height="gasket" ref="BASE_TREE_EL">
      <div v-show="foldStatus" class="base_tree_main">
        <!-- S 查询 -->
        <el-input v-model="filterText" class="base_tree_main_input" placeholder="输入关键字过滤" />
        <!-- E 查询 -->
        <!-- S 树结构 -->
        <el-tree
          ref="EL_TREE_REF"
          highlight-current
          auto-expand-parent
          empty-text="暂无数据"
          :nodeKey="nodeKey"
          :data="treeData"
          :lazy="lazyGet"
          :load="(node, resolve) => loadNode(node, resolve, props)"
          :expand-on-click-node="false"
          :props="treeProps"
          :filter-node-method="filterNode"
          :default-expanded-keys="expandedKeys"
          @node-click="clickNodeTree"
        >
          <template #default="{ node, data }">
            <slot :data="data">
              <div class="base_tree_node">
                <div>
                  <!-- S 节点前图标 -->
                  <span v-if="$slots.prefix"><slot name="prefix" :data="data"></slot></span>
                  <!-- E 节点前图标 -->
                  <!-- S 节点名称 -->
                  <span v-if="node.label.length && node.label.length > 10">
                    <el-tooltip :content="node.label" placement="right" effect="dark">
                      <div class="base_tree_node_label_tooltip base_tree_node_label">
                        {{ node.label.substring(0, 10) + '...' }}
                      </div>
                    </el-tooltip>
                  </span>
                  <span v-else class="base_tree_node_label">{{ node.label }}</span>
                  <!-- E 节点名称 -->
                </div>
                <!-- S 操作符号 -->
                <div class="base_tree_node_icon" v-if="data.hasIcon">
                  <el-icon color="var(--el-color-primary)" @click.stop="handleItemAdd(node, data)">
                    <Plus />
                  </el-icon>
                </div>
                <!-- E 操作符号 -->
              </div>
            </slot>
          </template>
        </el-tree>
        <!-- E 树结构 -->
      </div>
      <!-- S 横线 -->
      <BsgoalBaseLine vertical v-show="foldStatus" />
      <!-- E 横线 -->
      <!-- S 折叠按钮 -->
      <BsgoalBaseTreeFold ref="BSGOAL_BASE_TREE_FOLD_REF" v-model="foldStatus" />
      <!-- E 折叠按钮 -->
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */

.bsgoal-base-tree {
  display: inline-block;
  .base_tree {
    display: flex;
    box-sizing: border-box;
    position: relative;
    min-width: 14px;
    overflow-x: hidden;
  }
  .base_tree_main {
    width: 221px;
    padding: 16px;

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
  .base_tree_main_input {
    margin-bottom: 10px;
  }

  .base_tree .el-tree-node__content > i.el-tree-node__expand-icon {
    padding-left: 0px;
  }
  .base_tree_node {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .base_tree_node_label_tooltip {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .base_tree_node_label {
    flex: 1;
  }
  .base_tree_node_icon {
    flex: none;
  }

  .el-tree-node.is-current > .el-tree-node__content {
    color: var(--el-color-primary);
  }
}
</style>

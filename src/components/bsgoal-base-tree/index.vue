<!--
 * @Author: canlong.shen
 * @Date: 2023-04-21 08:43:33
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-25 10:05:14
 * @FilePath: \common\src\components\bsgoal-base-tree\index.vue
 * @Description: 虚拟化树型结构 公共组件
 * 
-->
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watch, watchEffect, computed } from 'vue'
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
    default: () => {}
  },
  /**
   * 初始化树节点
   * () => {
   *   return Promise(resolve =>  resolve([]))
   * }
   */
  initNode: {
    type: [Function],
    default: () => {}
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
  const { treeData = [] } = props
  if (!treeData || !treeData.length) {
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
</script>
<template>
  <div class="bsgoal-base-tree">
    <div class="base_tree" v-height="gasket">
      <div v-show="foldStatus" class="base_tree_main">
        <!-- S 查询 -->
        <el-input v-model="filterText" class="base_tree_main_input" placeholder="输入关键字过滤" />
        <!-- E 查询 -->
        <!-- S 树结构 -->
        <el-tree
          ref="EL_TREE_REF"
          highlight-current
          empty-text="暂无数据"
          :data="treeData"
          :lazy="lazyGet"
          :load="(node, resolve) => loadNode(node, resolve, props)"
          :expand-on-click-node="false"
          :props="treeProps"
          :filter-node-method="filterNode"
          @node-click="clickNodeTree"
        >
          <template #default="{ node, data }">
            <div class="base_tree_node">
              <!-- S 节点名称 -->
              <span class="base_tree_node_label">
                {{ node.label }}
              </span>
              <!-- E 节点名称 -->
              <!-- S 操作符号 -->
              <span class="base_tree_node_icon" v-show="data.hasIcon">
                <el-icon color="#409EFF" @click.stop="handleItemAdd(node, data)">
                  <Plus />
                </el-icon>
              </span>
              <!-- E 操作符号 -->
            </div>
          </template>
        </el-tree>
        <!-- E 树结构 -->
      </div>
      <!-- S 横线 -->
      <BsgoalBaseLine vertical v-show="foldStatus" />
      <!-- E 横线 -->
      <!-- S 折叠按钮 -->
      <BsgoalBaseTreeFold v-model="foldStatus" />
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
      // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
      width: 20px;
    }
    &::-webkit-scrollbar-track {
      // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      // border-radius: 0;
      // background: rgba(0, 0, 0, 0.1);
      // opacity: 0.1;
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
    display: flex;
    flex: 1;
  }
  .base_tree_node_label {
    flex: 1;
  }
  .base_tree_node_icon {
    flex: none;
  }
}
</style>

<!--
 * @Author: canlong.shen
 * @Date: 2023-04-21 08:43:39
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-27 11:49:24
 * @FilePath: \common\src\components\bsgoal-base-tree\demo.vue
 * @Description: 左侧树的演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import BsgoalBaseTree from './index.vue'

import { ref } from 'vue'

defineOptions({
  name: 'BsgoalBaseTreeDemo'
})

const props = defineProps({})

const treeData = ref([])
const getKey = (prefix, id) => {
  return `${prefix}-${id}`
}
const createData = (maxDeep, maxChildren, minNodesNumber, deep = 1, key = 'node') => {
  let id = 0
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber = deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
      const nodeKey = getKey(key, ++id)
      return {
        id: nodeKey,
        value: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined
      }
    })
}
treeData.value = createData(4, 4, 4)

const triggerTreeClick = (value, node, treeNode, event) => {
  console.log('triggerTreeClick ================')
  // console.log('value', value)
  // console.log('node', node)
  // console.log('treeNode', treeNode)
  // console.log('event', event)
}

const treeLazyLoad = (node) => {
  console.log('treeLazyLoad', node)
  return new Promise((resove, reject) => {
    setTimeout(() => {
      resove([
        {
          label: 'label2-1',
          isLeaf: true,
          hasIcon: true
        },
        {
          label: 'label2-2',
          key: 'label2-2',

          children: [
            {
              label: 'label2-2-1'
            }
          ]
        },
        {
          label: 'label2-3'
        }
      ])
    }, 1000)
  })
}

const treeInitNode = (node) => {
  console.log('treeInitNode', node)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          value: 'value1',
          label: 'label1',
          nodeKey:'label1'
        }
      ])
    }, 1000)
  })
}

const triggerAddClick = (params = '') => {
  console.log('triggerAddClick', params)
}

</script>
<template>
  <div class="bsgoal-base-tree-demo">
    <div class="base_tree_demo">
      <BsgoalBaseTree
        :data="[
          {
            value: 'value999',
            label: 'label999',
            children: [
              {
                label: '8888',
                key: '8888'
              }
            ]
          }
        ]"
        node-key="nodeKey"
        :lazy-load="treeLazyLoad"
        :init-node="treeInitNode"
        :expanded-keys="['label1']"
        @on-click="triggerTreeClick"
        @on-click-add="triggerAddClick"
      >
        <template #prefix="{data}">
          <div>66</div>
        </template>
      </BsgoalBaseTree>
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

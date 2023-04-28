/*
 * @Author: canlong.shen
 * @Date: 2023-04-10 10:41:52
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-28 16:17:42
 * @FilePath: \common\src\router\index.js
 * @Description: 路由配置
 * 
 */

import { createRouter, createWebHistory } from 'vue-router'
import LayoutHome from '@/components/layout/layout-home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutHome,
      children: [
        {
          path: '/bsgoal-base-table-demo',
          name: '表格',
          component: import('@/components/bsgoal-base-table/demo.vue')
        },
        {
          path: '/bsgoal-base-table-empty-demo',
          name: '表格空内容',
          component: import('@/components/bsgoal-base-table-empty/demo.vue')
        },
        {
          path: '/bsgoal-base-search-demo',
          name: '查询',
          component: import('@/components/bsgoal-base-search/demo.vue')
        },
        {
          path: '/bsgoal-base-search-table-demo',
          name: '查询+表格',
          component: import('@/components/bsgoal-base-search-table/demo.vue')
        },
        {
          path: '/bsgoal-base-form-demo',
          name: '表单',
          component: import('@/components/bsgoal-base-form/demo.vue')
        },
        {
          path: '/bsgoal-base-frame-demo',
          name: '内容框架',
          component: import('@/components/bsgoal-base-frame/demo.vue')
        },
        {
          path: '/bsgoal-base-line-demo',
          name: '分割线',
          component: import('@/components/bsgoal-base-line/demo.vue')
        },
        {
          path: '/bsgoal-base-tree-demo',
          name: '虚拟结构树',
          component: import('@/components/bsgoal-base-tree/demo.vue')
        },
        {
          path: '/bsgoal-base-dialog-demo',
          name: '弹窗',
          component: import('@/components/bsgoal-base-dialog/demo.vue')
        },
        {
          path: '/bsgoal-base-cascader-demo',
          name: '级联选择',
          component: import('@/components/bsgoal-base-cascader/demo.vue')
        },
        {
          path: '/bsgoal-base-tabs-demo',
          name: 'tabs标签',
          component: import('@/components/bsgoal-base-tabs/demo.vue')
        },
      ]
    }
  ]
})

export default router

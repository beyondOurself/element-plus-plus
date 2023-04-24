/*
 * @Author: canlong.shen
 * @Date: 2023-04-10 10:41:52
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-23 17:07:26
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
          name: '表格公共组件',
          component: import('@/components/bsgoal-base-table/demo.vue')
        },
        {
          path: '/bsgoal-base-search-demo',
          name: '查询公共组件',
          component: import('@/components/bsgoal-base-search/demo.vue')
        },
        {
          path: '/bsgoal-base-search-table-demo',
          name: '查询+表格公共组件',
          component: import('@/components/bsgoal-base-search-table/demo.vue')
        },
        {
          path: '/bsgoal-base-form-demo',
          name: '表单公共组件',
          component: import('@/components/bsgoal-base-form/demo.vue')
        },
        {
          path: '/bsgoal-base-frame-demo',
          name: '内容框架公共组件',
          component: import('@/components/bsgoal-base-frame/demo.vue')
        },
        {
          path: '/bsgoal-base-line-demo',
          name: '分割线公共组件',
          component: import('@/components/bsgoal-base-line/demo.vue')
        },
        {
          path: '/bsgoal-base-tree-demo',
          name: '虚拟结构树公共组件',
          component: import('@/components/bsgoal-base-tree/demo.vue')
        },
        {
          path: '/bsgoal-base-dialog-demo',
          name: '弹窗公共组件',
          component: import('@/components/bsgoal-base-dialog/demo.vue')
        },
      ]
    }
  ]
})

export default router

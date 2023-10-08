/*
 * @Author: canlong.shen
 * @Date: 2023-04-10 10:41:52
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-08 08:49:52
 * @FilePath: \v3_basic_component\src\router\index.js
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
          path: 'bsgoal-base-tag-demo',
          name: '标签',
          component: import('@/components/bsgoal-base-tag/demo.vue')
        },
        {
          path: 'bsgoal-base-gap-demo',
          name: '分割',
          component: import('@/components/bsgoal-base-gap/demo.vue')
        },
        {
          path: 'bsgoal-base-list-demo',
          name: '列表',
          component: import('@/components/bsgoal-base-list/demo.vue')
        },

        {
          path: 'bsgoal-base-overview-demo',
          name: '数据概览',
          component: import('@/components/bsgoal-base-overview/demo.vue')
        },
        {
          path: 'bsgoal-base-tree-table-demo',
          name: '树 + 表格',
          component: import('@/components/bsgoal-base-tree-table/demo.vue')
        },
        {
          path: 'bsgoal-base-icon-demo',
          name: '图标',
          component: import('@/components/bsgoal-base-icon/demo.vue')
        },
        {
          path: '/bsgoal-base-radio-group-demo',
          name: '单选框组',
          component: import('@/components/bsgoal-base-radio-group/demo.vue')
        },
        {
          path: '/bsgoal-base-table-operation-demo',
          name: '表格操作列',
          component: import('@/components/bsgoal-base-table-operation/demo.vue')
        },
        {
          path: '/bsgoal-base-cascader-multiple-demo',
          name: '级联选择多选',
          component: import('@/components/bsgoal-base-cascader-multiple/demo.vue')
        },
        {
          path: '/bsgoal-base-time-select-demo',
          name: '时间选择',
          component: import('@/components/bsgoal-base-time-select/demo.vue')
        },
        {
          path: '/bsgoal-base-dialog-form-demo',
          name: '弹窗表单',
          component: import('@/components/bsgoal-base-dialog-form/demo.vue')
        },
        {
          path: '/bsgoal-base-upload-demo',
          name: '附件上传',
          component: import('@/components/bsgoal-base-upload/demo.vue')
        },
        {
          path: '/bsgoal-base-sizes-demo',
          name: '页数切换',
          component: import('@/components/bsgoal-base-sizes/demo.vue')
        },
        {
          path: '/bsgoal-base-table-pagination-demo',
          name: '表格分页',
          component: import('@/components/bsgoal-base-table-pagination/demo.vue')
        },
        {
          path: '/bsgoal-base-viewer-demo',
          name: '图片预览',
          component: import('@/components/bsgoal-base-viewer/demo.vue')
        },
        {
          path: '/bsgoal-base-popover-demo',
          name: '弹出框',
          component: import('@/components/bsgoal-base-popover/demo.vue')
        },
        {
          path: '/bsgoal-base-input-demo',
          name: '输入框',
          component: import('@/components/bsgoal-base-input/demo.vue')
        },
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
        {
          path: '/bsgoal-base-tooltip-demo',
          name: '文字提示',
          component: import('@/components/bsgoal-base-tooltip/demo.vue')
        },
        {
          path: 'bsgoal-base-link-demo',
          name: '链接',
          component: import('@/components/bsgoal-base-link/demo.vue')
        },
        {
          path: 'bsgoal-base-button-demo',
          name: '按钮',
          component: import('@/components/bsgoal-base-button/demo.vue')
        },
        {
          path: 'bsgoal-base-layout-demo',
          name: '布局',
          component: import('@/components/bsgoal-base-layout/demo.vue')
        },
        {
          path: 'bsgoal-base-alert-demo',
          name: 'alert提示',
          component: import('@/components/bsgoal-base-alert/demo.vue')
        },
        {
          path: 'bsgoal-base-select-demo',
          name: '下拉选择器',
          component: import('@/components/bsgoal-base-select/demo.vue')
        },
        {
          path: 'bsgoal-base-time-range-demo',
          name: '时间范围选择器',
          component: import('@/components/bsgoal-base-time-range/demo.vue')
        },
        {
          path: 'bsgoal-base-time-demo',
          name: '时间选择器',
          component: import('@/components/bsgoal-base-time/demo.vue')
        },
        {
          path: 'bsgoal-base-switch-demo',
          name: '开关',
          component: import('@/components/bsgoal-base-switch/demo.vue')
        },
        {
          path: 'bsgoal-base-item-demo',
          name: '表单项',
          component: import('@/components/bsgoal-base-item/demo.vue')
        },
        {
          path: 'bsgoal-base-tree-table-demo',
          name: '树 + 查询 + 表格',
          component: import('@/components/bsgoal-base-tree-table/demo.vue')
        }
      ]
    }
  ]
})

export default router

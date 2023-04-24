/*
 * @Author: canlong.shen
 * @Date: 2023-04-19 09:10:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-19 10:42:30
 * @FilePath: \common\src\combines\component.js
 * @Description: 组件相关的组合函数
 *
 */

import { unref, nextTick } from 'vue'

/**
 * @Author: canlong.shen
 * @description: 自动计算表格高度
 * @param {*} el
 * @param {*} expression
 * @default:
 * @return {*}
 */
export const useAutoHeight = (el = null, { expression = 65 , arg ={}} = {}) => {
  const elValue = unref(el)
  if (elValue) {
    const elTable = elValue.querySelector('.el-table')
    if (elTable) {
      nextTick(() => {
        const { y = 0 } = elTable.getBoundingClientRect()
        elTable.style.height = `calc(100vh - ${y + expression}px)`
      })
    }
  }
}

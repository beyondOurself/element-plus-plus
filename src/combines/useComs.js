/*
 * @Author: canlong.shen
 * @Date: 2023-04-19 09:10:00
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-08 14:14:46
 * @FilePath: \common\src\combines\useComs.js
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
export const useAutoHeight = (el = null, { expression = 75, arg = {}, height = '' } = {}) => {
  const elValue = unref(el)
  if (elValue) {
    const elTable = elValue.querySelector('.el-table')
    if (elTable) {
      nextTick(() => {
        const { y = 0 } = elTable.getBoundingClientRect()
        let tableHeight = `calc(100vh - ${y + expression}px)`
        const intHeight = Number.parseInt(height)
        if (height) {
          if (intHeight) {
            tableHeight = `${height}px`
          } else {
            tableHeight = height
          }
        }
        elTable.style.height = tableHeight
      })
    }
  }
}

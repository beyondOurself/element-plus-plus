/*
 * @Author: canlong.shen
 * @Date: 2023-04-14 10:50:11
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-22 15:55:30
 * @FilePath: \common\src\directives\directiveBase.js
 * @Description: 常用的公共指令
 *
 */

const autoAlign = (el) => {
   let timeoutID = null
  //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  /**
   * label集合
   */
  const labelElLeftList = []
  const labelElRightList = []

  /**
   * 计算lable长度
   */
  const calcLabelWidth = (elInfoList = []) => {
    const widthList = elInfoList.map((mi) => mi.width)
    const maxWidth = Math.max(...widthList)
    elInfoList.forEach((fi) => {
      const { labelEl } = fi
      labelEl.style.width = `${maxWidth}px`
    })
  }
  /**
   * 过来出左侧lable集合,和右侧的label集合
   */
  const sortingLabelEl = () => {
    if (el) {
      const labelElList = el.querySelectorAll('.el-form-item__label')
      if (labelElList && labelElList.length) {
        let firstXPosition = 0
        labelElList.forEach((labelEl, index) => {
          labelEl.style.width = 'initial'
          labelEl.style.whiteSpace = 'nowrap'
          const { x = 0, width = 0 } = labelEl.getBoundingClientRect()
          const elementInfo = { x, width, labelEl }
          if (index === 0) {
            firstXPosition = x
          }
          if (x === firstXPosition) {
            labelElLeftList.push(elementInfo)
          } else {
            labelElRightList.push(elementInfo)
          }
        })
      }
    }
  }

  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  // 开始计算
   timeoutID = setTimeout(() => {
    sortingLabelEl()
    calcLabelWidth(labelElLeftList)
    calcLabelWidth(labelElRightList)
  }, 50)
}

export default {
  /**
   * 表单自动左对齐
   */
  align: {
    created(el) {
      window.addEventListener('resize', () => {
        autoAlign(el)
      })
    },
    mounted(el) {
      autoAlign(el)
    },
    unmounted(el) {
      window.removeEventListener('resize', autoAlign(el))
    }
  },
  /**
   * 表格自动高度
   */
  height: (el, { value = 65, arg = '' }) => {
    if (el) {
      const { y = 0 } = el.getBoundingClientRect()
      el.style.height = `calc(100vh - ${y + value}px)`
    }
  }
}

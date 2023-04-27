/*
 * @Author: canlong.shen
 * @Date: 2023-04-18 16:46:18
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-19 17:45:09
 * @FilePath: \common\src\combines\useFetchs.js
 * @Description: 请求组合函数
 *
 */

import { ref } from 'vue'

/**
 * @Author: canlong.shen
 * @description: 请求的组合函数
 * @param {*} request
 * @default:
 * @return {*}
 */
export const useFetch = (
  request = Promise.resolve(),
  call = null,
  loading = ref(false),
  data = ref(null)
) => {
  const message = ref('')
  loading.value = true
  request
    .then((res = {}) => {
      const { data: resData = {}, message: resMessage = '' } = res
      data.value = resData
      message.value = resMessage
      if (call) {
        call(true, resData)
      }
      loading.value = false
    })
    .catch((err = {}) => {
      if (typeof err === 'object') {
        const { message: errMessage = '' } = err
        message.value = errMessage
      } else {
        message.value = err
      }
      if (call) {
        call(false, err)
      }
      loading.value = false
    })
    .finally(() => {
      loading.value = false
    })

  return { data, message, loading }
}

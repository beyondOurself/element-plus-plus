/*
 * @Author: canlong.shen
 * @Date: 2023-05-08 15:11:05
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-06-21 14:07:09
 * @FilePath: \common\src\utils\common.js
 * @Description: 常用的工具方法
 * 
 */


export const getInstanceType = (instance = null) => {
  const type = toString.apply(instance)

  switch (type) {
    case '[object Object]':
      return 'object'
    case '[object Function]':
      return 'function'
    case '[object String]':
      return 'string'
    case '[object Number]':
      return 'number'
    case '[object Null]':
      return 'null'
    case '[object Boolean]':
      return 'boolean'
    case '[object Undefind]':
      return 'undefind'
  }
}

export const isObject = (tar) => {
  return getInstanceType(tar) === 'object'
}
export const isFunction = (tar) => {
  return getInstanceType(tar) === 'function'
}
export const isString = (tar) => {
  return getInstanceType(tar) === 'string'
}
export const isNumber = (tar) => {
  return getInstanceType(tar) === 'number'
}
export const isNull = (tar) => {
  return getInstanceType(tar) === 'null'
}
export const isBoolean = (tar) => {
  return getInstanceType(tar) === 'boolean'
}
export const isUndefind = (tar) => {
  return getInstanceType(tar) === 'undefind'
}
export const isArray = (tar) => {
  return Array.isArray(tar)
};
/*
 * @Author: canlong.shen
 * @Date: 2023-04-13 16:20:09
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-28 16:47:30
 * @FilePath: \v3_basic_component\src\enums\componentTypeEnums.js
 * @Description: 组件类型 枚举
 * 
 */



export default class ComponentTypeEnums {
  static get INPUT(){ return 'text'}
  static get INPUT_NUMBER(){ return 'number'}
  static get INPUT_TEXT_AREA(){ return 'textarea'}
  static get SELECT(){ return 'select'}
  static get SLIDER(){ return 'slider'}
  static get SWITCH(){ return 'switch'}
  static get RADIO(){ return 'radio'}
  static get CHECKBOX(){ return 'checkbox'}
  static get DATE(){ return 'date'}
  static get WEEK(){ return 'week'}
  static get MONTH(){ return 'month'}
  static get YEAR(){ return 'year'}
  static get DATE_RANGE(){ return 'daterange'}
  static get MONTH_RANGE(){ return 'monthrange'}
  static get TIME(){ return 'time'}
  static get TIME_RANGE(){ return 'timerange'}
  static get DATE_TIME(){ return 'datetime'}
  static get DATE_TIME_RANGE(){ return 'datetimerange'}
  static get OPERATION(){ return 'operation'}
  static get CASCADER(){ return 'cascader'}
  static get CHECKBOX_SINGLE(){ return 'checkboxsingle'}
  static get CASCADER_MULTIPLE(){ return 'cascadermultiple'}
}

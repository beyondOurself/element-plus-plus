/*
 * @Author: canlong.shen
 * @Date: 2023-04-13 16:20:09
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-18 11:53:02
 * @FilePath: \v3_basic_component\src\enums\ValidatorTypeEnums.js
 * @Description: 校验 枚举
 * 
 */



export class ValidatorTypeEnums {
  static get PHONE(){ return  Symbol() }
  static get ID(){ return Symbol()}
  static get PLATE(){ return Symbol()}
}



export class RegexTypeEnums {

  static get [ValidatorTypeEnums.PHONE](){ return 'text'}
   
}

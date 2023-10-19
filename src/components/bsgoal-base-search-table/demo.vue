<!--
 * @Author: canlong.shen
 * @Date: 2023-04-18 17:04:53
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-10-19 20:13:25
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-search-table\demo.vue
 * @Description: 查询 + 表格 组合公共组件
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, unref, shallowRef, nextTick } from 'vue'
import ComponentTypeEnums from '../../enums/componentTypeEnums.js'
import BsgoalBaseSearchTable from './index.vue'
import BsgoalBaseButton from '../bsgoal-base-button/index.vue'
import BsgoalBaseTableOperation from '../bsgoal-base-table-operation/index.vue'
defineOptions({
  name: 'BsgoalSearchTableDemo'
})

const props = defineProps({})

const configOptions = ref([
  {
    label: 'prop1',
    value: '111',
    prop: 'prop1',
    type: ComponentTypeEnums.INPUT,
    minWidth: 200
  },
  {
    label: '手机号',
    value: 'select2',
    type: ComponentTypeEnums.SELECT,
    filterable: true,
    prop: 'prop2',
    range: [
      {
        label: 'select1',
        value: 'select1'
      },
      {
        label: 'select2',
        value: 'select2'
      },
      {
        label: 'select3',
        value: 'select3'
      },
      {
        label: 'select4',
        value: 'select5'
      }
    ]
  },
  {
    label: '身份证号',
    // value: '111',
    type: ComponentTypeEnums.SLIDER,
    prop: 'prop3'
  },
  {
    label: 'prop4',
    // value: '111',
    type: ComponentTypeEnums.SWITCH,
    prop: 'prop4'
  },
  {
    label: 'prop5',
    // value: '111',
    type: ComponentTypeEnums.RADIO,
    prop: 'prop5',
    range: [
      {
        label: 'radio1',
        value: 'radio1'
      },
      {
        label: 'radio2',
        value: 'radio2'
      }
    ]
  },
  {
    label: 'prop5-1',
    value: 'radio1',
    type: ComponentTypeEnums.RADIO,
    prop: 'prop5-1',
    mode: 'button',
    range: [
      {
        label: 'radio1',
        value: 'radio1'
      },
      {
        label: 'radio2',
        value: 'radio2'
      }
    ]
  },
  {
    label: 'prop6',
    value: [],
    type: ComponentTypeEnums.CHECKBOX,
    prop: 'prop6',
    range: [
      {
        label: 'checkbox1',
        value: 'checkbox1'
      },
      {
        label: 'checkbox2',
        value: 'checkbox2'
      }
    ]
  },
  {
    label: 'prop7',
    // value: '111',
    type: ComponentTypeEnums.DATE,
    prop: 'prop7',
    format: 'YYYY-MM-DD'
  },
  {
    label: 'prop9',
    // value: '111',
    type: ComponentTypeEnums.MONTH,
    prop: 'prop9'
  },
  {
    label: 'prop10',
    // value: '111',
    type: ComponentTypeEnums.YEAR,
    prop: 'prop10'
  },
  {
    label: 'prop11',
    value: [],
    type: ComponentTypeEnums.DATE_RANGE,
    prop: '_start_end',
    range: ['startDate', 'endDate']
  },
  {
    label: 'prop12',
    // value: '111',
    type: ComponentTypeEnums.MONTH_RANGE,
    prop: 'prop12'
  },
  {
    label: 'prop13',
    // value: '111',
    type: ComponentTypeEnums.TIME,
    prop: 'prop13'
  },
  {
    label: 'prop14',
    // value: '111',
    type: ComponentTypeEnums.TIME_RANGE,
    prop: 'prop14'
  },
  {
    label: 'prop15',
    // value: '111',
    type: ComponentTypeEnums.DATE_TIME,
    prop: 'prop15'
  },
  {
    label: 'prop16',
    // value: '111',
    type: ComponentTypeEnums.DATE_TIME_RANGE,
    prop: 'prop16'
  },
  {
    label: 'prop17',
    // value: '111',
    type: ComponentTypeEnums.CASCADER,
    prop: 'prop17',
    single: true,
    range: [
      {
        id: 354,
        institutionName: '深圳市博思高科技有限公司',
        parentInstitutionId: 354,
        parentId: 2,
        userName: '卢阳万',
        phone: '13249398733',
        province: null,
        city: '深圳市',
        district: '光明区',
        detailsAddress: '百艺盛大厦9楼',
        provinceCode: null,
        cityCode: '430200',
        districtCode: null,
        systemAccount: null,
        children: [
          {
            id: 2831,
            institutionName: '子机构',
            parentInstitutionId: 354,
            parentId: 3,
            userName: '成都',
            phone: '14548454545',
            province: null,
            city: '',
            district: '',
            detailsAddress: '',
            provinceCode: '',
            cityCode: '',
            districtCode: '',
            systemAccount: '479502',
            children: [],
            label: '子机构',
            value: 2831
          },
          {
            id: 3302,
            institutionName: '新权限机构',
            parentInstitutionId: 354,
            parentId: 3,
            userName: '孙先生',
            phone: '18851450010',
            province: null,
            city: '',
            district: '',
            detailsAddress: '',
            provinceCode: '',
            cityCode: '',
            districtCode: '',
            systemAccount: '479608',
            children: [],
            label: '新权限机构',
            value: 3302
          },
          {
            id: 3307,
            institutionName: '测试机构-shencanlong',
            parentInstitutionId: 354,
            parentId: 3,
            userName: '沈灿龙',
            phone: '15099836861',
            province: null,
            city: '深圳市',
            district: '光明区',
            detailsAddress: 'xxx',
            provinceCode: '440000',
            cityCode: '440300',
            districtCode: '440311',
            systemAccount: '370259',
            children: [],
            label: '测试机构-shencanlong',
            value: 3307
          }
        ],
        label: '深圳市博思高科技有限公司',
        value: 354
      }
    ]
  }
])
const configOptions2 = ref([
  {
    label: 'prop1',
    value: '111',
    prop: 'prop1',
    type: ComponentTypeEnums.INPUT,
    width: 100
  },
  {
    label: 'prop2',
    value: 'select2',
    type: ComponentTypeEnums.SELECT,
    filterable: true,
    prop: 'prop2',
    range: [
      {
        label: 'select1',
        value: 'select1'
      },
      {
        label: 'select2',
        value: 'select2'
      },
      {
        label: 'select3',
        value: 'select3'
      },
      {
        label: 'select4',
        value: 'select5'
      }
    ]
  },
  {
    label: 'prop3',
    // value: '111',
    type: ComponentTypeEnums.SLIDER,
    prop: 'prop3'
  },
  {
    label: 'prop4',
    // value: '111',
    type: ComponentTypeEnums.SWITCH,
    prop: 'prop4'
  }
  // {
  //   label: 'prop5',
  //   // value: '111',
  //   type: ComponentTypeEnums.RADIO,
  //   prop: 'prop5',
  //   range: [
  //     {
  //       label: 'radio1',
  //       value: 'radio1'
  //     },
  //     {
  //       label: 'radio2',
  //       value: 'radio2'
  //     }
  //   ]
  // },
  // {
  //   label: 'prop6',
  //   value: [],
  //   type: ComponentTypeEnums.CHECKBOX,
  //   prop: 'prop6',
  //   range: [
  //     {
  //       label: 'checkbox1',
  //       value: 'checkbox1'
  //     },
  //     {
  //       label: 'checkbox2',
  //       value: 'checkbox2'
  //     }
  //   ]
  // },
  // {
  //   label: 'prop7',
  //   // value: '111',
  //   type: ComponentTypeEnums.DATE,
  //   prop: 'prop7',
  //   format: 'YYYY-MM-DD'
  // },
  // {
  //   label: 'prop9',
  //   // value: '111',
  //   type: ComponentTypeEnums.MONTH,
  //   prop: 'prop9'
  // },
  // {
  //   label: 'prop10',
  //   // value: '111',
  //   type: ComponentTypeEnums.YEAR,
  //   prop: 'prop10'
  // },
  // {
  //   label: 'prop11',
  //   // value: '111',
  //   type: ComponentTypeEnums.DATE_RANGE,
  //   prop: 'prop11',
  //   range: ['startDate', 'endDate']
  // },
  // {
  //   label: 'prop12',
  //   // value: '111',
  //   type: ComponentTypeEnums.MONTH_RANGE,
  //   prop: 'prop12'
  // },
  // {
  //   label: 'prop13',
  //   // value: '111',
  //   type: ComponentTypeEnums.TIME,
  //   prop: 'prop13'
  // },
  // {
  //   label: 'prop14',
  //   // value: '111',
  //   type: ComponentTypeEnums.TIME_RANGE,
  //   prop: 'prop14'
  // },
  // {
  //   label: 'prop15',
  //   // value: '111',
  //   type: ComponentTypeEnums.DATE_TIME,
  //   prop: 'prop15'
  // },
  // {
  //   label: 'prop16',
  //   // value: '111',
  //   type: ComponentTypeEnums.DATE_TIME_RANGE,
  //   prop: 'prop16'
  // },
  // {
  //   label: 'prop17',
  //   // value: '111',
  //   type: ComponentTypeEnums.CASCADER,
  //   prop: 'prop17',
  //   single: true,
  //   range: [
  //     {
  //       id: 354,
  //       institutionName: '深圳市博思高科技有限公司',
  //       parentInstitutionId: 354,
  //       parentId: 2,
  //       userName: '卢阳万',
  //       phone: '13249398733',
  //       province: null,
  //       city: '深圳市',
  //       district: '光明区',
  //       detailsAddress: '百艺盛大厦9楼',
  //       provinceCode: null,
  //       cityCode: '430200',
  //       districtCode: null,
  //       systemAccount: null,
  //       children: [
  //         {
  //           id: 2831,
  //           institutionName: '子机构',
  //           parentInstitutionId: 354,
  //           parentId: 3,
  //           userName: '成都',
  //           phone: '14548454545',
  //           province: null,
  //           city: '',
  //           district: '',
  //           detailsAddress: '',
  //           provinceCode: '',
  //           cityCode: '',
  //           districtCode: '',
  //           systemAccount: '479502',
  //           children: [],
  //           label: '子机构',
  //           value: 2831
  //         },
  //         {
  //           id: 3302,
  //           institutionName: '新权限机构',
  //           parentInstitutionId: 354,
  //           parentId: 3,
  //           userName: '孙先生',
  //           phone: '18851450010',
  //           province: null,
  //           city: '',
  //           district: '',
  //           detailsAddress: '',
  //           provinceCode: '',
  //           cityCode: '',
  //           districtCode: '',
  //           systemAccount: '479608',
  //           children: [],
  //           label: '新权限机构',
  //           value: 3302
  //         },
  //         {
  //           id: 3307,
  //           institutionName: '测试机构-shencanlong',
  //           parentInstitutionId: 354,
  //           parentId: 3,
  //           userName: '沈灿龙',
  //           phone: '15099836861',
  //           province: null,
  //           city: '深圳市',
  //           district: '光明区',
  //           detailsAddress: 'xxx',
  //           provinceCode: '440000',
  //           cityCode: '440300',
  //           districtCode: '440311',
  //           systemAccount: '370259',
  //           children: [],
  //           label: '测试机构-shencanlong',
  //           value: 3307
  //         }
  //       ],
  //       label: '深圳市博思高科技有限公司',
  //       value: 354
  //     }
  //   ]
  // }
])

const tableData = ref([
  {
    id: 1,
    prop1: 'row1value',
    prop2: 'row1value',
    prop3: 'row1value',
    prop4: 'row1value',
    prop5: 'row1value',
    prop6: 'row1value',
    prop7: 'row1value',
    prop8: 'row1value',
    prop9: 'row1value',
    prop10: 'row1value',
    prop11: 'row1value',
    prop12: 'row1value',
    prop13: 'row1value',
    prop14: 'row1value',
    prop15: 'row1value',
    prop16: 'row1value',
    hasChildren: false,
    children: [
      {
        id: 31,
        prop1: 'row1-1value',
        prop2: 'row1-1value',
        prop3: 'row1-1value',
        prop4: 'row1-1value',
        prop5: 'row1-1value',
        prop6: 'row1-1value',
        prop7: 'row1-1value',
        prop8: 'row1-1value',
        prop9: 'row1-1value',
        prop10: 'row1-1value',
        prop11: 'row1-1value',
        prop12: 'row1-1value',
        prop13: 'row1-1value',
        prop14: 'row1-1value',
        prop15: 'row1-1value',
        prop16: 'row1-1value'
      }
    ]
  },
  {
    id: 2,
    prop1: 'row2value',
    prop2: 15099836861,
    prop3: '445122199601045935',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 3,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 4,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 5,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 6,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 7,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 8,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 9,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 10,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 11,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 12,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 13,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 14,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 15,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 16,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 17,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 18,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 19,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 20,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 21,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 22,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 23,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 24,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  },
  {
    id: 25,

    prop1: 'row2value',
    prop2: 'row2value',
    prop3: 'row2value',
    prop4: 'row2value',
    prop5: 'row2value',
    prop6: 'row2value',
    prop7: 'row2value',
    prop8: 'row2value',
    prop9: 'row2value',
    prop10: 'row2value',
    prop11: 'row2value',
    prop12: 'row2value',
    prop13: 'row2value',
    prop14: 'row2value',
    prop15: 'row2value',
    prop16: 'row2value'
  }
])

const call = (state, data) => {
  console.log('call state', state)
  console.log('call data', data)
}

const tableDataVal = unref(tableData)

const testList = shallowRef([])

for (let i = 0; i < 100; i++) {
  testList.value.push({
    id:i,
    prop1: i,
    prop2: i,
    prop3: i,
    prop4: i,
    prop5: i,
    prop6: i,
    prop7: i,
    prop8: i,
    prop9: i,
    prop10: i,
    prop11: i,
    prop12: i,
    prop13: i,
    prop14: i,
    prop15: i,
    prop16: i
  })
}

console.log('testList', testList.value)

const fetch = (params) => {
  console.log('params >>>', params)
  const { pageSize = 20, currentPage = 0 } = params

  const spliceList = testList.value.slice(pageSize * (currentPage - 1), pageSize * currentPage)
  return new Promise((resolve) => {
    setTimeout(() => {
      // 存在分页
      resolve({
        data: {
          rows: spliceList,
          total: testList.value.length
        },
        message: '获取数据成功'
      })
      // 不存在分页
      // resolve({
      //   data: tableDataVal,
      //   message: '获取数据成功'
      // })
    }, 3000)
  })
}

const BSGOAL_BASE_SEARCH_TABLE_REF = ref(null)

let curSearchModel = ref({})

nextTick(() => {
  curSearchModel.value = BSGOAL_BASE_SEARCH_TABLE_REF.value.getSearchModel()
  console.log('curSearchModel', curSearchModel)
})

const test = () => {
  const searchParams = BSGOAL_BASE_SEARCH_TABLE_REF.value.getSearchParams()
  console.log('searchParams', searchParams)
  curSearchModel.value.prop1 = ''
  // configOptions.value =  configOptions2.value

  // BSGOAL_BASE_SEARCH_TABLE_REF.value.refresh()
}

const task = (done = () => {}, rows = {}) => {
  console.log('rows', rows.prop1)
  setTimeout(() => {
    done()
  }, 3000)
}

const overviewOptions = shallowRef([])

setTimeout(() => {
  overviewOptions.value = [
    {
      title: '事件总数',
      icon: 'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_event.svg',
      data: 3423
    },
    {
      title: '今天',
      icon: 'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_today.svg',
      data: 546
    },
    {
      title: '昨天 ',
      icon: 'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_yesterday.svg',
      data: 243
    },
    {
      title: '环比昨日 ',
      icon: 'https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/overview/icon_ring%20ratio.svg',
      data: '0.00%'
    }
  ]
}, 3000)

const sortFields = ref(['prop4'])

const changeSelection = (selection = []) => {
  console.log('selection', selection)
}
</script>
<template>
  <div class="bsgoal-search-table-demo">
    <div class="search_table_demo">
      <!-- <DemoTable /> -->
      <BsgoalBaseSearchTable
        ref="BSGOAL_BASE_SEARCH_TABLE_REF"
        row-key="id"
        selection
        operation
        auto-layout-menu
        hasOverview
        :sortFields="sortFields"
        :overview-options="overviewOptions"
        :operation-width="400"
        :show-summary="true"
        :call="call"
        :fetch="fetch"
        :config-options="configOptions"
        :expression="75"
        @on-search="triggerSearch"
        @selection-change="changeSelection"
      >
        <!-- 
        <BsgoalBaseSearchTable
        selection
        operation
        :has-search="false"
        :has-page="false"
        :call="call"
        :fetch="fetch"
        :config-options="configOptions"
        :expression="75"
        @on-search="triggerSearch"
      > -->
        <template v-slot:menu>
          <el-button type="primary" @click="test">操作按钮</el-button>
          <el-button type="primary" @click="test">操作按钮</el-button>
          <el-button type="primary" @click="test">操作按钮</el-button>

          <el-alert title="info alert" type="info" />
        </template>
        <template v-slot:operation="{ row }">
          <div>
            <BsgoalBaseTableOperation>
              <BsgoalBaseButton :task="task" :values="row" content="按钮1" />
              <BsgoalBaseButton :task="task" :values="row" content="按钮1" />
              <BsgoalBaseButton :task="task" :values="row" content="按钮1" />
              <template #more> </template>
            </BsgoalBaseTableOperation>
          </div>
        </template>
      </BsgoalBaseSearchTable>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

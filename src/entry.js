/*
 * @Author: canlong.shen
 * @Date: 2023-05-11 18:31:55
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-06 11:50:31
 * @FilePath: \v3_basic_component\src\entry.js
 * @Description: 打包 入口文件
 * 
 */



import BsgoalBaseForm from '@/components/bsgoal-base-form/index.vue'
import BsgoalBaseTable from '@/components/bsgoal-base-table/index.vue'
import BsgoalBaseLine from '@/components/bsgoal-base-line/index.vue'
import BsgoalBaseSearchTable from '@/components/bsgoal-base-search-table/index.vue'
import BsgoalBaseTree from '@/components/bsgoal-base-tree/index.vue'
import BsgoalBaseDialog from '@/components/bsgoal-base-dialog/index.vue'
import BsgoalBaseTabs from '@/components/bsgoal-base-tabs/index.vue'
import BsgoalBaseLink from '@/components/bsgoal-base-link/index.vue'
import BsgoalBaseButton from '@/components/bsgoal-base-button/index.vue'
import BsgoalBaseLayout from '@/components/bsgoal-base-layout/index.vue'
import BsgoalBaseAlert from '@/components/bsgoal-base-alert/index.vue'
import BsgoalBaseSelect from '@/components/bsgoal-base-select/index.vue'
import BsgoalBaseTime from '@/components/bsgoal-base-time/index.vue'
import BsgoalBaseTimeRange from '@/components/bsgoal-base-time-range/index.vue'
import BsgoalBaseSwitch from '@/components/bsgoal-base-switch/index.vue'
import BsgoalBaseItem from '@/components/bsgoal-base-item/index.vue'
import BsgoalBaseInput from '@/components/bsgoal-base-input/index.vue'
import BsgoalBaseTreeTable from '@/components/bsgoal-base-tree-table/index.vue'
import BsgoalBaesPopover from '@/components/bsgoal-baes-popover/index.vue'
import BsgoalBaseViewer from '@/components/bsgoal-base-viewer/index.vue'
import BsgoalBaseTooltip from '@/components/bsgoal-base-tooltip/index.vue'
import BsgoalBaseUpload from '@/components/bsgoal-base-upload/index.vue'
import BsgoalBaseDialogForm from '@/components/bsgoal-base-dialog-form/index.vue'
import BsgoalBaseTimeSelect from '@/components/bsgoal-base-time-select/index.vue'
import BsgoalBaseCascaderMultipl from '@/components/bsgoal-base-cascader-multiple/index.vue'
import BsgoalBaseTableOperation from '@/components/bsgoal-base-table-operation/index.vue'
import BsgoalBaseRadioGroup from '@/components/bsgoal-base-radio-group/index.vue'
import componentTypeEnums from '@/enums/componentTypeEnums.js'
import { useFetch } from '@/combines/useFetchs.js'


export const ComponentTypeEnums = componentTypeEnums
export const useFetchApi = useFetch

export default {
  install(Vue, options = {}) {
    const { exclude = [] } = options

    const componentsMap = {
      BsgoalBaseForm,
      BsgoalBaseTable,
      BsgoalBaseLine,
      BsgoalBaseSearchTable,
      BsgoalBaseTree,
      BsgoalBaseDialog,
      BsgoalBaseTabs,
      BsgoalBaseLink,
      BsgoalBaseButton,
      BsgoalBaseLayout,
      BsgoalBaseAlert,
      BsgoalBaseSelect,
      BsgoalBaseTime,
      BsgoalBaseTimeRange,
      BsgoalBaseSwitch,
      BsgoalBaseItem,
      BsgoalBaseInput,
      BsgoalBaseTreeTable,
      BsgoalBaesPopover,
      BsgoalBaseViewer,
      BsgoalBaseTooltip,
      BsgoalBaseUpload,
      BsgoalBaseDialogForm,
      BsgoalBaseTimeSelect,
      BsgoalBaseCascaderMultipl,
      BsgoalBaseTableOperation,
      BsgoalBaseRadioGroup
    }

    for (const [name, component] of Object.entries(componentsMap)) {
      if (!exclude.includes(name)) {
        Vue.component(name, component)
      }
    }
  },
  ComponentTypeEnums,
  useFetch
}

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
import enumType from '@/enums/enumType.js'
import { useFetch } from '@/combines/useFetchs.js'


export const EnumType = enumType
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
      BsgoalBaseLayout
    }

    for (const [name, component] of Object.entries(componentsMap)) {
      if (!exclude.includes(name)) {
        Vue.component(name, component)
      }
    }
  },
  enumType,
  useFetch
}

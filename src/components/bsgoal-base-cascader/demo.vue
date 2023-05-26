<!--
 * @Author: canlong.shen
 * @Date: 2023-04-25 15:29:36
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-27 16:05:33
 * @FilePath: \common\src\components\bsgoal-base-cascader\demo.vue
 * @Description: 级联选择公共组件 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref ,watch ,toRaw} from 'vue';
import  BsgoalBaseCascader from './index.vue'

defineOptions({
  name: 'BsgoalBaseCascaderDemo'
})

 const props = defineProps({

})

const  cascaderValue = ref([])

watch(cascaderValue,(val) => {
  console.log('cascaderValue >>', toRaw(val) );
})

const  cascaderData = ref([
    {
        "id": 354,
        "institutionName": "深圳市博思高科技有限公司",
        "parentInstitutionId": 354,
        "parentId": 2,
        "userName": "卢阳万",
        "phone": "13249398733",
        "province": null,
        "city": "深圳市",
        "district": "光明区",
        "detailsAddress": "百艺盛大厦9楼",
        "provinceCode": null,
        "cityCode": "430200",
        "districtCode": null,
        "systemAccount": null,
        "children": [
            {
                "id": 2831,
                "institutionName": "子机构",
                "parentInstitutionId": 354,
                "parentId": 3,
                "userName": "成都",
                "phone": "14548454545",
                "province": null,
                "city": "",
                "district": "",
                "detailsAddress": "",
                "provinceCode": "",
                "cityCode": "",
                "districtCode": "",
                "systemAccount": "479502",
                "children": [],
                "label": "子机构",
                "value": 2831
            },
            {
                "id": 3302,
                "institutionName": "新权限机构",
                "parentInstitutionId": 354,
                "parentId": 3,
                "userName": "孙先生",
                "phone": "18851450010",
                "province": null,
                "city": "",
                "district": "",
                "detailsAddress": "",
                "provinceCode": "",
                "cityCode": "",
                "districtCode": "",
                "systemAccount": "479608",
                "children": [],
                "label": "新权限机构",
                "value": 3302
            },
            {
                "id": 3307,
                "institutionName": "测试机构-shencanlong",
                "parentInstitutionId": 354,
                "parentId": 3,
                "userName": "沈灿龙",
                "phone": "15099836861",
                "province": null,
                "city": "深圳市",
                "district": "光明区",
                "detailsAddress": "xxx",
                "provinceCode": "440000",
                "cityCode": "440300",
                "districtCode": "440311",
                "systemAccount": "370259",
                "children": [],
                "label": "测试机构-shencanlong",
                "value": 3307
            }
        ],
        "label": "深圳市博思高科技有限公司",
        "value": 354
    }
])

</script>
<template>
  <div class="bsgoal-base-cascader-demo"> 
    {{ cascaderValue }}
    <BsgoalBaseCascader v-model="cascaderValue" :data-options="cascaderData"  />
  </div>
</template>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
.bsgoal-base-cascader-demo {

}
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

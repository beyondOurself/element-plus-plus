<!--
 * @Author: canlong.shen
 * @Date: 2023-07-13 16:37:39
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-07-14 15:03:07
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-upload\demo.vue
 * @Description: 附近上传演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseUpload from './index.vue'

defineOptions({
  name: 'BsgoalBaseUploadDemo'
})

const props = defineProps({})

const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }
])

const changeFiles = (uploadFiles, deleteFiles, fileList) => {
  console.log('uploadFiles', uploadFiles)
  console.log('deleteFiles', deleteFiles)
  console.log('fileList', fileList)
}

const uploadList = ref([])
const deleteList = ref([])

const BSGOAL_BASE_UPLOAD_REF = ref(null)
const test = () => {
    uploadList.value = []
    fileList.value = []
    deleteList.value = []
//   BSGOAL_BASE_UPLOAD_REF.value.reset()
}
</script>
<template>
  <div class="bsgoal-base-upload-demo">
    {{ fileList }}
    ====================================
    {{ uploadList }}
    ====================================
    {{ deleteList }}
    ====================================

    <el-button type="primary" @click="test">重置</el-button>

    <BsgoalBaseUpload
      ref="BSGOAL_BASE_UPLOAD_REF"
      v-model="fileList"
      v-model:uploadFiles="uploadList"
      v-model:deleteFiles="deleteList"
      @on-change="changeFiles"
    ></BsgoalBaseUpload>
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

<!--
 * @Author: canlong.shen
 * @Date: 2023-07-13 16:37:33
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-08-14 10:44:46
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-upload\index.vue
 * @Description: 附件上传
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref, watch, watchEffect } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { preview, vPreview, Vue3ImagePreview } from 'vue3-image-preview'
import { ElMessage } from 'element-plus'
defineOptions({
  name: 'BsgoalBaseUpload'
})

const props = defineProps({
  /**
   * 附件列表
   */
  modelValue: {
    type: [Array],
    default: () => []
  },
  /**
   *  上传列表
   */
  uploadFiles: {
    type: [Array],
    default: () => []
  },
  /**
   * 删除列表
   */
  deleteFiles: {
    type: [Array],
    default: () => []
  },
  /**
   * 是否禁用上传
   */
  disabled: {
    type: [Boolean],
    default: false
  },
  /**
   * 是否支持多选文件
   */
  multiple: {
    type: [Boolean],
    default: true
  },

  /**
   * 允许上传文件的最大数量
   */
  limit: {
    type: [Number],
    default: 3
  },
  /**
   * 文件类型
   */
  accept: {
    type: [String],
    default: ''
  },
  /**
   * 限制的文件大小 默认 10M
   */
  fileSize: {
    type: [Number],
    default: 10
  }
})

const emits = defineEmits([
  'on-change',
  'update:modelValue',
  'update:uploadFiles',
  'update:deleteFiles'
])

const fileListModel = ref()
const uploadFilesList = ref()
const deleteFilesList = ref()

watchEffect(() => {
  const { modelValue, uploadFiles, deleteFiles } = props
  fileListModel.value = modelValue
  uploadFilesList.value = uploadFiles
  deleteFilesList.value = deleteFiles
})

const removeFiles = (file, files) => {
  const { status = '', name = '' } = file
  const uploadFilesValue = uploadFilesList.value
  if (status === 'success') {
    deleteFilesList.value.push(file)
  } 
  if (status === 'ready') {
    const findIndex = uploadFilesValue.findIndex((fi) => fi.name === name)
    if (findIndex !== -1) {
      uploadFilesValue.splice(findIndex, 1)
    }
  }
  refreshFileList(files)
}

const changeFiles = (file, files) => {
  const { fileSize = 0 } = props
  console.log('file', file)
  // 10485760
  const { size = 0 } = file
  if (size && size >= fileSize * 1048576 ) {
    ElMessage({
      message: '超过文件大小限制',
      grouping: true,
      type: 'error'
    })
    fileListModel.value.pop()
    return
  }
  uploadFilesList.value = files.filter((fi) => fi.status === 'ready')
  refreshFileList(files)
}

const refreshFileList = (files) => {
  const uploadFilesListValue = [...uploadFilesList.value]
  const deleteFilesListValue = [...deleteFilesList.value]
  emits('on-change', uploadFilesListValue, deleteFilesListValue, files)
  emits('update:modelValue', files)
  emits('update:uploadFiles', uploadFilesListValue)
  emits('update:deleteFiles', deleteFilesListValue)
}

const exceedFiles = () => {
  const { limit = 0 } = props
  ElMessage({
    message: `超出${limit}数量限制!`,
    grouping: true,
    type: 'error'
  })
}

const previewImg = (uploadFile) => {
  preview({
    images: uploadFile.url
  })
}

const beforeUpload = (params = '') => {
   

  return false
}

const reset = () => {
  emits('update:modelValue', [])
  emits('update:uploadFiles', [])
  emits('update:deleteFiles', [])
}

// ---> S 暴露属性  <---
defineExpose({
  reset
})
// ---> E 暴露属性  <---
</script>
<template>
  <div class="bsgoal-base-upload">
    <div class="base_upload">
      {{ fileListModel }}
      <el-upload
        list-type="picture-card"
        v-model:file-list="fileListModel"
        :accept="accept"
        :multiple="multiple"
        :auto-upload="false"
        :limit="limit"
        :disabled="disabled"
        :before-upload="beforeUpload"
        :on-preview="previewImg"
        :on-change="changeFiles"
        :on-remove="removeFiles"
        :on-exceed="exceedFiles"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </div>
  </div>
</template>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
.bsgoal-base-upload {
  .el-upload-list__item {
    width: 100px !important;
    height: 100px !important;
  }
  .el-upload {
    width: 100px;
    height: 100px;
  }
}
</style>

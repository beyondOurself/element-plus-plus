<!--
 * @Author: canlong.shen
 * @Date: 2023-05-18 16:24:31
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-09-07 17:29:16
 * @FilePath: \v3_basic_component\src\components\bsgoal-base-button\demo.vue
 * @Description:  按钮 演示
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import { ref } from 'vue'
import BsgoalBaseButton from './index.vue'

defineOptions({
  name: 'BsgoalBaseButtonDemo'
})

const props = defineProps({})
const task = (done) => {
  setTimeout(() => {
    done()
  }, 3000)
}
const tooltip = `{"data":{"areaId":0,"areaSerialNumber":"","baseFloor":"2","buildingId":2882,"buildingName":"1栋","buildingSerialNumber":"","closeTime":"23:59","endTime":"2023-09-05","faceUrl":"","floorPower":"2","houseCallNumber":"1007","id":"217573","idCard":"","openNumber":8,"openTime":"00:00","ownerId":170475,"ownerName":"测试11","ownerType":1,"password":"685078","residentialId":216,"residentialName":"博思高展厅项目","roomId":8809,"roomName":"203","roomNumber":"203","sex":"","startTime":"2023-09-04","telephone":""},"commandCode":"10007","deviceCode":"FE8D6ADAFA410AF0C972"}`
</script>
<template>
  <div class="bsgoal-base-button-demo">
    <BsgoalBaseButton :task="task"  mode="detail" hasConfirm > </BsgoalBaseButton>
    <BsgoalBaseButton :task="task"   type="primary" plain content="测试" url="https://bsgoalsmartcloud.oss-cn-shenzhen.aliyuncs.com/estate-web/button/icon_take%20notes.svg" > </BsgoalBaseButton>
    <BsgoalBaseButton :task="task"  link type="primary" :tooltip="tooltip" tooltipPlacement="left-start" plain content="测试"> </BsgoalBaseButton>

    <BsgoalBaseButton :task="task" mode="edit" plain > </BsgoalBaseButton>
    <BsgoalBaseButton :task="task" mode="delete" plain > </BsgoalBaseButton>
    <BsgoalBaseButton :task="task" mode="cancel" > </BsgoalBaseButton>
    <BsgoalBaseButton :task="task" mode="confirm" content="取消"> </BsgoalBaseButton>

    <BsgoalBaseButton :task="task"  mode="add" plain  content="取消"> </BsgoalBaseButton>
    <BsgoalBaseButton :task="task" mode="add"> </BsgoalBaseButton>
    <BsgoalBaseButton :task="task" mode="delete"> </BsgoalBaseButton>
    <BsgoalBaseButton :task="task" #default="{ loading }">
      <div>
        {{ loading }}
        <el-button type="danger" :loading="loading">外部</el-button>
      </div>
    </BsgoalBaseButton>
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

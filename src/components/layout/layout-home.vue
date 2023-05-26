<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 13:41:13
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-05-26 16:09:56
 * @FilePath: \common\src\components\layout\layout-home.vue
 * @Description: 首页
 * 
-->

<script setup>
/* setup模板
---------------------------------------------------------------- */
import LayoutLeftMenu from '@/components/layout/layout-left-menu.vue'
import LayoutTopHeader from '@/components/layout/layout-top-header.vue'
import LayoutRightContainer from '@/components/layout/layout-right-container.vue'

defineOptions({
  name: 'LayoutHome'
})
</script>

<template>
  <div class="layout-home">
    <el-container>
      <el-header class="layout_el_header">
        <LayoutTopHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LayoutLeftMenu />
        </el-aside>
        <el-main style="padding: 10px; background-color: #f0f2f5">
          <LayoutRightContainer style="background-color: #fff">
            <router-view />
          </LayoutRightContainer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
.layout-home {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.layout_el_header {
  background-color: #409eff;
  padding: 0px;
}
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>

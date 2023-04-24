<!--
 * @Author: canlong.shen
 * @Date: 2023-04-10 14:05:59
 * @LastEditors: canlong.shen
 * @LastEditTime: 2023-04-19 09:27:42
 * @FilePath: \common\src\components\layout\layout-left-menu.vue
 * @Description: 左侧菜单栏
 * 
-->

<template>
  <div class="layout-left-menu">
    <el-menu default-active="0" style="height: calc(100vh - 60px) ;">
      <template v-for=" (menu, index) of menuList" :key="index">
        <el-menu-item :index="index">
          <el-icon><icon-menu /></el-icon>
          <router-link :to="menu.path">
            <span>{{ menu.name }}</span>
          </router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'LayoutLeftMenu'
}
</script>
<script setup>
/* setup模板
---------------------------------------------------------------- */
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { ref, computed, toRefs, watch, unref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const routes = router.getRoutes()
const { children = [] } = routes.find((fi) => fi.name === 'home') || {}
const menuList = ref(children)
</script>
<style lang="scss" scoped>
/* 自定义样式
---------------------------------------------------------------- */
</style>
<style lang="scss">
/* 覆盖样式
---------------------------------------------------------------- */
</style>
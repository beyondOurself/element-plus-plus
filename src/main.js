import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// 中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import '@/styles/index.css'

const app = createApp(App)
// 增加默认中文(国际化)配置
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.mount('#app')

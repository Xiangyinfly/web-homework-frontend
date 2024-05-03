import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from '@/App.vue'
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import '@/styles/index.scss'
import router from "@/router";
import pinia from "@/store";
//引入路由鉴权的文件
import "@/router/permission.ts"

const app = createApp(App)
//设置国际化
app.use(ElementPlus, {
    locale: zhCn,
})
//将所有的全局组件统一放在globalComponent中进行安装
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')


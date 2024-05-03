import SvgIcon from './SvgIcon/index.vue'
import {App} from "vue"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent:any = {
    SvgIcon,
}

export default {
    install(app:App) {
        Object.keys(allGlobalComponent).forEach(key => {
            app.component(key,allGlobalComponent[key])
        })

        //将ElementPlusIconsVue注册为全局组件
        for (const [key,component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key,component)
        }
    }
}
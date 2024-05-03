import router from "@/router/index.ts";
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import pinia from "@/store";
import {useUserStore} from "@/store/modules/user.ts";
import setting from "@/setting.ts";
let userStore = useUserStore(pinia)
nprogress.configure({showSpinner:false})

//全局守卫：项目中任何路由切换都会触发的钩子
router.beforeEach(async (to, from, next) => {
    nprogress.start()

    let token = userStore.token
    if (token) {
        if (to.path == '/login') {
            next({path: '/'})
        } else {
            if (userStore.userInfo.username) {
                next()
            } else {
                try {
                    await userStore.getUserInfo()
                    next()
                } catch (error) {
                    await userStore.userLogout()
                    next({path: '/login', query: {redirect: to.path}})
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({path: '/login'})
        }
    }
})
router.afterEach((to,from) => {
    nprogress.done()
    document.title = `${setting.title} - ${to.meta.title}`
})
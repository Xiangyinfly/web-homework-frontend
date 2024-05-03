import {defineStore} from "pinia";
import {LoginRequest, loginResponseData} from "@/api/user/types.ts";
import {reqLogin, reqUserInfo, reqLogout} from "@/api/user";
import {GET_TOKEN, REMOVE_TOKEN, SET_TOKEN} from "@/utils/token.ts";
import { constantRoute } from "@/router/routes.ts";
import {reactive, ref} from "vue";

export const useUserStore = defineStore("User",() => {

    let token = ref(GET_TOKEN())
    let menuRoutes = reactive(constantRoute)
    let userInfo:any = reactive({})
    const userLogin = async (data:LoginRequest) => {
        let res:loginResponseData = await reqLogin(data)
        if (res.code == 200) {
            token.value = <string>(res.data)
            //本地持久化存储
            SET_TOKEN(<string>(res.data))
            return 'ok'
        } else {
            return Promise.reject(new Error(res.data))
        }
    }
    const getUserInfo = async () => {
        let res = await reqUserInfo()
        if (res.code == 200) {
            //获取用户信息
            Object.assign(userInfo,res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }
    }
    const userLogout = async () => {
        let res = await reqLogout()
        if (res.code == 200) {
            token.value = ''
            Object.keys(userInfo).forEach(u => delete userInfo[u])
            REMOVE_TOKEN()
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }

    }
    return {token,menuRoutes,userInfo,userLogin,getUserInfo,userLogout}
})
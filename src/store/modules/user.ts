import {defineStore} from "pinia";
import {empInfo, empInfoResponse, LoginRequest, loginResponseData} from "@/api/user/types.ts";
import {reqLogin, reqLogout, reqMyInfo} from "@/api/user";
import {GET_TOKEN, REMOVE_TOKEN, SET_TOKEN} from "@/utils/token.ts";
import { constantRoute } from "@/router/routes.ts";
import {reactive, ref} from "vue";

export const useUserStore = defineStore("User",() => {

    let token = ref(GET_TOKEN())
    let menuRoutes = reactive(constantRoute)
    let myInfo:empInfo = reactive({})
    const userLogin = async (data:LoginRequest) => {
        let res:loginResponseData = await reqLogin(data)
        if (res.code == 200) {
            token.value = <string>(res.data.token)
            //本地持久化存储
            SET_TOKEN(<string>(res.data.token))
            return 'ok'
        } else {
            return Promise.reject(new Error(res.msg))
        }
    }
    const getMyInfo = async () => {
        let res:empInfoResponse = await reqMyInfo()
        if (res.code == 200) {
            //获取用户信息
            Object.assign(myInfo,res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(res.msg))
        }
    }
    const userLogout = async () => {
        let res = await reqLogout()
        if (res.code == 200) {
            token.value = ''
            Object.keys(myInfo).forEach(u => delete myInfo[u])
            REMOVE_TOKEN()
            return 'ok'
        } else {
            return Promise.reject(new Error(res.message))
        }

    }
    return {token,menuRoutes,userInfo: myInfo,userLogin,userLogout,getUserInfo: getMyInfo}
})
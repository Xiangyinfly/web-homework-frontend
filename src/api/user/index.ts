import request from '@/utils/request';
import {LoginRequest,userResponseData,loginResponseData} from './types'
// enum API {
//     LOGIN_URL = '/user/login',
//     USERINFO_URL = '/user/info',
// }
//
// export const reqLogin = (data: loginForm) => request.post<any,loginResponseData>(API.LOGIN_URL,data)
//
// export const reqUserInfo = () => request.get<any,userResponseData>(API.USERINFO_URL)

//项目用户相关的请求地址
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}

//登录接口
export const reqLogin = (data: LoginRequest) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)

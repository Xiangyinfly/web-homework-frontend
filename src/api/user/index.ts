import request from '@/utils/request';
import {LoginRequest,empInfoResponse,loginResponseData} from './types'

//项目用户相关的请求地址
enum API {
    LOGIN_URL = '/login',
    USERINFO_URL = '/emp/myinfo',
    LOGOUT_URL = '/logout',
}

//登录接口
export const reqLogin = (data: LoginRequest) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqMyInfo = () => request.get<any, empInfoResponse>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)

//项目用户相关的请求地址
import request from "@/utils/request.ts";
import {
    AddEmpRequest, empInfo,
    empInfoListRequest,
    empInfoListResponse,
    empInfoResponse,
    UpdateEmpRequest
} from "@/api/emp/types.ts";
import {DeptInfoResponse} from "@/api/dept/types.ts";

enum API {
    USERINFO_URL = '/emp/myinfo',
    EMP_INFO_LIST_URL = '/emp',
    ADD_EMP_URL = '/emp',
    UPDATE_EMP_URL = '/emp',
}

//获取用户信息
export const reqMyInfo = () => request.get<any, empInfoResponse>(API.USERINFO_URL)

export const reqEmpInfoList = (data:empInfoListRequest) => request.get<any, empInfoListResponse>(API.EMP_INFO_LIST_URL, {params:data})
export const addEmp = (data:AddEmpRequest) => request.post<any, any>(API.ADD_EMP_URL, data)
export const updateEmp = (data:UpdateEmpRequest) => request.post<any, any>(API.UPDATE_EMP_URL, data)

export const getEmpById = (empId:string) => request.get<any, empInfo>(`/emp/${empId}`)

//项目用户相关的请求地址
import request from "@/utils/request.ts";
import {
    AddEmpRequest, empInfo,
    empInfoListRequest,
    empInfoListResponse,
    empInfoResponse,
    UpdateEmpRequest
} from "@/api/emp/types.ts";

enum API {
    USERINFO_URL = '/emp/myinfo',
    EMP_INFO_LIST_URL = '/emp',
    ADD_EMP_URL = '/emp',
    UPDATE_EMP_URL = '/emp',
    DELETE_BATCH_EMP_URL = '/emp',
    GET_HEAD_TEACHER_URL = '/emp/htlist',
}

//获取用户信息
export const reqMyInfo = () => request.get<any, empInfoResponse>(API.USERINFO_URL)

export const reqEmpInfoList = (data:empInfoListRequest) => request.get<any, empInfoListResponse>(API.EMP_INFO_LIST_URL, {params:data})
export const addEmp = (data:AddEmpRequest) => request.post<any, any>(API.ADD_EMP_URL, data)
export const updateEmp = (data:UpdateEmpRequest) => request.put<any, any>(API.UPDATE_EMP_URL, data)

export const getEmpById = (empId:string) => request.get<any, empInfo>(`/emp/${empId}`)
export const deleteEmp = (empId:string) => request.delete<any, any>(`/emp/${empId}`)
export const deleteBatchEmp = (empIds:number[]) => request.delete<any, any>(API.DELETE_BATCH_EMP_URL,{data:empIds})
export const getHeaderTeacherInfoList = () => request.get<any, empInfoListResponse>(API.GET_HEAD_TEACHER_URL)

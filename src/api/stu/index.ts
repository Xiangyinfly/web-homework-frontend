import request from "@/utils/request.ts";

import {Stu, StuInfoListRequest, StuInfoResponse} from "@/api/stu/types.ts";

enum API {
    STU_INFO_LIST_URL = '/stu',
    ADD_STU_URL = '/stu',
    UPDATE_STU_URL = '/stu',
    DELETE_BATCH_STU_URL = '/stu',
    GET_STU_CLAZZ_AGG_URL = "/stu/agg/clazz",
    GET_STU_GENDER_AGG_URL = "/stu/agg/gender",
}



export const reqStuInfoList = (data:StuInfoListRequest) => request.get<any, StuInfoResponse>(API.STU_INFO_LIST_URL, {params:data})
export const addStu = (data:Stu) => request.post<any, any>(API.ADD_STU_URL, data)
export const updateStu = (data:Stu) => request.put<any, any>(API.UPDATE_STU_URL, data)

export const getStuById = (stuId:string) => request.get<any, any>(`/stu/${stuId}`)
export const deleteBatchStu = (stuIds:number[]) => request.delete<any, any>(API.DELETE_BATCH_STU_URL,{data:stuIds})
export const getStuClazzAgg = () => request.get<any, any>(API.GET_STU_CLAZZ_AGG_URL)
export const getStuGenderAgg = () => request.get<any, any>(API.GET_STU_GENDER_AGG_URL)

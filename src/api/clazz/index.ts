import request from "@/utils/request.ts";
import {clazz, clazzInfoListRequest, clazzInfoListResponse} from "@/api/clazz/types.ts";

enum API {
    CLAZZ_INFO_LIST_URL = '/clazz',
    ADD_CLAZZ_URL = '/clazz',
    UPDATE_CLAZZ_URL = '/clazz',
}


export const reqClazzInfoList = (data:clazzInfoListRequest) => request.get<any, clazzInfoListResponse>(API.CLAZZ_INFO_LIST_URL, {params:data})
export const addClazz = (data:clazz) => request.post<any, any>(API.ADD_CLAZZ_URL, data)
export const updateClazz = (data:clazz) => request.put<any, any>(API.UPDATE_CLAZZ_URL, data)

export const getClazzById = (clazzId:string) => request.get<any, any>(`/clazz/${clazzId}`)
export const deleteClazz = (clazzId:string) => request.delete<any, any>(`/clazz/${clazzId}`)

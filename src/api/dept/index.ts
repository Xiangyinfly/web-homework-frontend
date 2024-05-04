import request from "@/utils/request.ts";
import {AddDeptRequest, DeptInfo, DeptInfoListResponse, DeptInfoResponse} from "@/api/dept/types.ts";

enum API {
    DEPT_LIST_URL = "/dept",
    ADD_DEPT_URL = "/dept",
    UPDATE_DEPT_URL = "/dept"
}
export const getDeptList = () => request.get<any, DeptInfoListResponse>(API.DEPT_LIST_URL)
export const getDeptById = (deptId:string) => request.get<any, DeptInfoResponse>(`/dept/${deptId}`)
export const addDept = (addDeptRequest: AddDeptRequest) => request.post<any, any>(API.ADD_DEPT_URL,addDeptRequest)
export const deleteDept = (deptId:string) => request.delete<any, any>(`/dept/${deptId}`)
export const updateDept = (dept: DeptInfo) => request.put<any, any>(API.UPDATE_DEPT_URL,dept)
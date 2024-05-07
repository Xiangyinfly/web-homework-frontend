import request from "@/utils/request.ts";
import {CourseEmpResponse, CourseEmpListRequest, CourseEmpListResponse, CourseEmp} from "@/api/arrange/types.ts";

enum API {
    COURSE_EMP_LIST_URL = '/course/ce',
    ADD_COURSE_EMP_URL = '/course/ce',
    DELETE_COURSE_EMP_URL = '/course/ce',
}



export const reqCourseEmpList = (data:CourseEmpListRequest) => request.get<any, CourseEmpListResponse>(API.COURSE_EMP_LIST_URL, {params:data})
export const addCourseEmp = (data:CourseEmp) => request.post<any, any>(API.ADD_COURSE_EMP_URL, data)
export const deleteCourseEmp = (data:CourseEmp) => request.delete<any, any>(API.DELETE_COURSE_EMP_URL,{data:data})

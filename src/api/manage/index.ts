import request from "@/utils/request.ts";
import {Course, CourseInfoListRequest} from "@/api/manage/types.ts";
import {CourseInfoResponse} from "@/api/manage/types.ts";

enum API {
    COURSE_INFO_LIST_URL = '/course',
    ADD_COURSE_URL = '/course',
    UPDATE_COURSE_URL = '/course',
    LIST_ALL_COURSE_URL = '/course/listall',
}



export const reqCourseInfoList = (data:CourseInfoListRequest) => request.get<any, CourseInfoResponse>(API.COURSE_INFO_LIST_URL, {params:data})
export const addCourse = (data:Course) => request.post<any, any>(API.ADD_COURSE_URL, data)
export const updateCourse = (data:Course) => request.put<any, any>(API.UPDATE_COURSE_URL, data)

export const getCourseById = (courseId:string) => request.get<any, any>(`/course/${courseId}`)
export const deleteCourse = (courseId:string) => request.delete<any, any>(`/course/${courseId}`)
export const getCourseList = () => request.get<any, any>(API.LIST_ALL_COURSE_URL)


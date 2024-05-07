
export interface ResponseResult {
    code: number
    msg: string
    data?: any
}

export interface CourseEmpResponse {
    courseId: string,
    courseName: string,
    empId: number,
    empName: string
}
export interface CourseEmp {
    courseId?: string,
    empId?: number
}

export interface CourseEmpListResponse extends ResponseResult {
    data: CourseEmpList
}

export interface CourseEmpList {
    rows?: CourseEmpResponse[],
    total?: number
}

export interface CourseEmpListRequest {
    courseId?: string,
    courseName?: string,
    empName?: string
    page?: number,
    pageSize?: number,
}
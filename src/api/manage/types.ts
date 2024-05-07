
export interface ResponseResult {
    code: number
    msg: string
    data?: any
}

export interface Course {
    id?: string,
    name?: string,
    description?: number,
    createTime?: string
    updateTime?: string
}

export interface CourseInfoResponse extends ResponseResult {
    data: CourseInfoList
}

export interface CourseInfoList {
    rows?: Course[],
    total?: number
}

export interface CourseInfoListRequest {
    id?: string,
    name?: string,
    page?: number,
    pageSize?: number,
}
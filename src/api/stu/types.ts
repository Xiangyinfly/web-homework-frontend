
export interface ResponseResult {
    code: number
    msg: string
    data?: any
}

export interface Stu {
    id?: string,
    name?: string,
    clazz?: number,
    gender?: number | string,
    phone?: string,
    education?: number | string,
    illegalTime?: number,
    illegalGrade?: number
    createTime?: string
    updateTime?: string
}

export interface StuInfoResponse extends ResponseResult {
    data: StuInfoList
}

export interface StuInfoList {
    rows?: Stu[],
    total?: number
}

export interface StuInfoListRequest {
    name?: string,
    id?: string,
    education?: number,
    clazz?: number,
    page?: number,
    pageSize?: number,
}
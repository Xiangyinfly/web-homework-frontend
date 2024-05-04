export interface ResponseResult {
    code: number
    msg: string
}

export interface DeptInfo {
    id?: number,
    name?: string,
    createTime?: string,
    updateTime?: string
}

export interface DeptInfoListResponse extends ResponseResult {
    data: DeptInfo[]
}

export interface DeptInfoResponse extends ResponseResult {
    data: DeptInfo
}

export interface AddDeptRequest {
    name?: string
}

export interface UpdateDeptRequest {
    id?: number,
    name?: string
}
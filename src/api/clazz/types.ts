export interface ResponseResult {
    code: number
    msg: string
    data?: any
}

export interface clazz {
    id?: number,
    name?: string,
    classroom?: string,
    headTeacher?: string
}

//定义获取用户信息返回数据类型
export interface clazzInfoResponse extends ResponseResult {
    data: clazz
}

export interface clazzInfoList {
    rows?: clazz[],
    total?: number
}

export interface clazzInfoListResponse extends ResponseResult {
    data?: clazzInfoList
}

export interface clazzInfoListRequest {
    name?: string,
    page?: number,
    pageSize?: number
}


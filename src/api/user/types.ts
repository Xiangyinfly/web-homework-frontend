export interface LoginRequest {
    username: string,
    password: string
}
export interface ResponseResult {
    code: number
    msg: string
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseResult {
    data: {
        id: number
        token: string
    }
}

export interface empInfo{
    id?: number,
    username?: string,
    password?: string,
    name?: string,
    gender?: number,
    image?: string,
    job?: string,
    entryDate?: string,
    deptId?: number,
    createTime?: string,
    updateTime?: string
}

//定义获取用户信息返回数据类型
export interface empInfoResponse extends ResponseResult {
    data: empInfo
}
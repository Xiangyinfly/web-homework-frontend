export interface LoginRequest {
    username: string,
    password: string
}
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
    data: string
}

//定义获取用户信息返回数据类型
export interface userResponseData extends ResponseData {
    data: {
        routes: string[]
        buttons: string[]
        roles: string[]
        name: string
        avatar: string
    }
}

// export interface loginResponseData {
//     code: number,
//     data: dataType
// }
//
// export interface userResponseData {
//     code: number,
//     data: user
// }
//
// interface dataType {
//     token?: string,
//     message?:string
// }
//
// interface user {
//     checkedUser: userinfo
// }
//
// interface userinfo {
//     userId: number
//     avatar: string,
//     username: string,
//     password: string,
//     desc: string,
//     roles: string[],
//     buttons: string[],
//     routes: string[],
//     token: string
// }
//

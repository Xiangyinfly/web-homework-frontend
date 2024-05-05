export interface ResponseResult {
    code: number
    msg: string
}

export interface empInfo{
    id?: number,
    username?: string,
    password?: string,
    name?: string,
    gender?: any,
    image?: string,
    job?: any,
    entryDate?: string,
    deptId?: number,
    createTime?: string,
    updateTime?: string
}

//定义获取用户信息返回数据类型
export interface empInfoResponse extends ResponseResult {
    data: empInfo
}

export interface empInfoList {
    rows?: empInfo[],
    total?: number
}

export interface empInfoListResponse extends ResponseResult {
    data?: empInfoList
}


export interface empInfoListRequest {
    name?:string,
    gender?:number,
    startTime?:string,
    endTime?:string,
    page?:number,
    pageSize?:number
}


// public class AddEmpRequest {
//     @NotBlank
//     private String username;
//     @NotBlank
//     private String name;
//     @NotNull
//     private Integer gender;
//     private String image;
//     private Integer job;
//     private Date entryDate;
//     private Integer deptId;
// }

export interface AddEmpRequest {
    username?: string,
    name?: string,
    gender?: any,
    image?: string,
    job?: any,
    entryDate?: string,
    deptId?: number
}

export interface UpdateEmpRequest {
    id?: number,
    username?: string,
    name?: string,
    gender?: any,
    image?: string,
    job?: any,
    entryDate?: string,
    deptId?: number
}

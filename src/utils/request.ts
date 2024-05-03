import axios from "axios";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/store/modules/user.ts";

//创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

//添加请求和响应拦截器
request.interceptors.request.use((config) => {
    let userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    return config
})
request.interceptors.response.use((response) => {
    return response.data
},(error) => {
    let message = error.response.status
    ElMessage({
        type: 'error',
        message
    })
    return Promise.reject(error)
})
export default request
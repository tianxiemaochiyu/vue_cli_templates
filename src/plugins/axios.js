import axios from 'axios'
import AXIOS_CONFIG from '@/config/axios'
import {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} from '@/interceptors/axios'

let axiosInstance = {}

axiosInstance = axios.create(AXIOS_CONFIG)

// 注入请求拦截
axiosInstance
    .interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 注入失败拦截
axiosInstance
    .interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance
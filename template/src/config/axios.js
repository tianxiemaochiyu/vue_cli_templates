/**
 * Created by catscorpio on 2019/3/11.
 */
export default {
    maxContentLength: 2000,
    headers: {},
    baseURL: '/',
    timeout: 20000, // 超时时间
    retry: 2, // 超时再次请求次数
    retryDelay: 1000 // 超时后再次发起请求的时间间隔
}
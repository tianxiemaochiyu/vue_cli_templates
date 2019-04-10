// import axios from '@/plugins/axios';

export function requestSuccessFunc(config) {
    return config;
}

export function requestFailFunc(requestError) {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    return Promise.reject(requestError);
}

export function responseSuccessFunc(responseObj) {
    // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
    let resData = responseObj.data;
    if(resData.error){
        return Promise.reject('服务器未知错误，请稍后重试');
    }
    return resData;
}

export function responseFailFunc(responseError) {
    // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
    // ...
    if (responseError.response) {
        if (responseError.response.status >= 500) {
            return Promise.reject('服务器未知错误，请稍后重试');
        }
        if (responseError.response.data && responseError.response.data.head) {
            switch (responseError.response.data.head.code) {
                default:
                    return Promise.reject(responseError.response.data);
            }
        }
        return Promise.reject(responseError);
    } else {
        return Promise.reject(responseError);
    }
}
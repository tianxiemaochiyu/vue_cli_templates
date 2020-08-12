const crypto = require("crypto")
import store from "@/plugins/store"
import router from "@/plugins/router"
import axios from "@/plugins/axios"
import { Message } from "element-ui"

export function requestSuccessFunc(config) {
    // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
    const method = config.method.toUpperCase()
    let tokenObj = {}
    // 单独两步验证，强制登录时进行两步验证
    if (!tokenObj.token) tokenObj = false
    if (config.signature) {
        tokenObj = config.signature
    }
    if (!config.unSignature && tokenObj) {
        let url =
            (config.baseURL.replace("/test/api/", "/api/") || "/api/v1") +
            config.url
        let queryStr = ""
        let tonce = Date.parse(new Date()) / 1000
        if (method === "GET" || method === "DELETE") {
            const params = {
                tonce,
                ...config.params,
            }
            let keys = Object.keys(params)
            let keysArray = keys.sort()
            keysArray.forEach((v) => {
                // queryStr += v + "=" + encodeURI(params[v]) + "&";
                queryStr += v + "=" + params[v] + "&"
            })
        } else {
            const params = {
                tonce,
                ...config.paramsObj,
            }
            // }
            let keys = Object.keys(params).sort()
            keys.forEach((v) => {
                queryStr += v + "=" + encodeURI(params[v]) + "&"
            })
        }
        queryStr = queryStr.substr(0, queryStr.length - 1)
        config.headers["Authorization"] = tokenObj.token
        config.headers["Tonce"] = tonce
        config.headers["Sign"] = _getHmacSHA256(
            method,
            url,
            queryStr,
            tokenObj.expire_at
        )
    }
    let languageStr
    switch (store.state.global.language) {
        case "jap":
            languageStr = "ja-JP"
            break
        case "kor":
            languageStr = "ko"
            break
        default:
            languageStr = store.state.global.language
    }
    config.headers["Accept-Language"] = languageStr
    return config
}

export function requestFailFunc(requestError) {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    // ...

    return Promise.reject(requestError)
}

export function responseSuccessFunc(responseObj) {
    // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
    // ...
    // 假设我们请求体为
    // {
    //     code: 1010,
    //     msg: 'this is a msg',
    //     data: null
    // }
    //处理跨域请求时的预检请求返回结果
    if (responseObj.config.isCor) {
        return responseObj.data
    }
    let resData = responseObj.data
    let { code } = resData.head
    switch (code) {
        case "1000": // 如果业务成功，直接进成功回调
            return resData.body
        default:
            // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
            !responseObj.config.noShowDefaultError &&
                window.GLOBAL.vbus.$emit("global.$dialog.show", resData.msg)
            return Promise.reject(resData)
    }
}

export function responseFailFunc(responseError) {
    // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
    if (responseError.response) {
        if (responseError.response.status == 503) {
            return Promise.reject(responseError.response.data)
        }
        if (responseError.response.status >= 500) {
            return Promise.reject("服务器未知错误，请稍后重试")
        }
        if (responseError.response.data && responseError.response.data.head) {
            switch (responseError.response.data.head.code) {
                case "2001":
                case "2015":
                case "2016":
                    _needJumpLogin(responseError.config)
                    return Promise.reject(responseError.response.data)
                default:
                    return Promise.reject(responseError.response.data)
            }
        }
        return Promise.reject(responseError)
    } else {
        if (
            responseError.code === "ECONNABORTED" &&
            responseError.config.method === "get"
        ) {
            // 请求超时了
            var config = responseError.config
            // 配置不存在或者未设置retry属性
            if (!config || !config.retry) return Promise.reject(responseError)

            // 设置已经重新请求次数的变量以便下次判断
            config.__retryCount = config.__retryCount || 0

            // 检查再次请求次数是否超过设定
            if (config.__retryCount >= config.retry) {
                // 超时次数超过设定
                Message({
                    type: "error",
                    message: "请求超时，已多次尝试链接",
                    showClose: true,
                })
                return Promise.reject(responseError)
            }

            // 增加再次请求计数
            config.__retryCount += 1

            // 创建promise延时处理再次请求
            var backoff = new Promise(function (resolve) {
                setTimeout(function () {
                    resolve()
                }, config.retryDelay || 1)
            })

            // 返回一个其中包含了再次请求的promise，
            return backoff.then(function () {
                // url会因为baseURL不停的叠加
                config.url = config.url.replace(config.baseURL, "")
                if (_isJSON(config.data)) {
                    // axios默认把data JSON化了，重新请求时会导致签名算法读取的是字符串，导致出错
                    config.data = JSON.parse(config.data)
                }
                return axios(config)
            })
        }
        return Promise.reject(responseError)
    }
}

// 签名算法
function _getHmacSHA256(method, url, fields, expire_at) {
    let message = method + "|" + url + "|" + fields
    let str = crypto
        .createHmac("sha256", expire_at)
        .update(message)
        .digest("hex")
    return str
}

function _needJumpLogin(config) {
    if (router.history.current.path === "/login") {
        return
    }
    if (config.name === "getInfo") {
        store.dispatch("Quit")
        window.location.reload()
    } else {
        store.dispatch("Quit").then(() => {
            Message({
                type: "error",
                message: "请重新登录",
                showClose: true,
            })
            router.push({
                path: "/login",
                query: {
                    redirect: router.history.current.fullPath,
                },
            })
        })
    }
}

function _isJSON(str) {
    if (typeof str == "string") {
        try {
            JSON.parse(str)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
    return false
}

const BigNumber = require("bignumber.js")

export function getNumb() {
    var num = new Array()
    for (var i = 0; i < 10; i++) {
        var val = Math.ceil(Math.random() * 30)
        var isEqu = false
        for (var idx in num) {
            if (num[idx] == val) {
                isEqu = true
                break
            }
        }
        if (isEqu) i--
        else num[num.length] = val
    }
    return num
}

// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil((difference / duration) * 50)

    function scroll(start, end, step) {
        if (start === end) return

        let d = start + step > end ? end : start + step
        if (start > end) {
            d = start - step < end ? end : start - step
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}

export function assert(condition, msg) {
    if (!condition) throw new Error(`[Apior] ${msg}`)
}

export function emailValidate(str) {
    let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
    return reg.test(str)
}
export function passwordValidate(str) {
    let reg = /^[a-zA-Z]{2,}[a-zA-Z0-9_]{6,}/
    return reg.test(str)
}
export function activedCodedValidate(str) {
    let reg = /^[0-9]{6}$/
    return reg.test(str)
}
export function phoneNumberValidate(str) {
    let reg = /^1[3|4|5|8][0-9]\d{4,8}$/
    return reg.test(str)
}

export function deepCopy(o) {
    if (o instanceof Array) {
        var n = []
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i])
        }
        return n
    } else if (o instanceof Function) {
        var f = new Function("return " + o.toString())()
        return f
    } else if (o instanceof Object) {
        var m = {}
        for (var k in o) {
            m[k] = deepCopy(o[k])
        }
        return m
    } else {
        return o
    }
}

export function deepAssign(n, o) {
    if (o instanceof Array) {
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepCopy(o[i])
        }
        return n
    } else if (o instanceof Function) {
        n = new Function("return " + o.toString())()
        return n
    } else if (o instanceof Object) {
        for (var k in o) {
            n[k] = deepAssign(n[k], o[k])
        }
        return n
    } else {
        return o
    }
}

// 对象数组排序
export function sortObject(array, key) {
    let temp = array.sort(function (a, b) {
        return new BigNumber(findProp(a, key)).gt(findProp(b, key)) ? -1 : 1
    })
    return temp
}

// 递归查找对象属性
export function findProp(o, key) {
    if (o[key]) {
        return o[key]
    } else {
        var n = undefined
        for (var i in o) {
            if (o[i] instanceof Object) {
                n = findProp(o[i], key)
            }
        }
        return n
    }
}

/**
 * 节流函数
 * @param method 事件触发的操作
 * @param mustRunDelay 间隔多少毫秒需要触发一次事件
 */
export function throttle(method, mustRunDelay) {
    let timer,
        args = arguments,
        start
    return function loop() {
        let self = this
        let now = Date.now()
        if (!start) {
            start = now
        }
        if (timer) {
            clearTimeout(timer)
        }
        if (now - start >= mustRunDelay) {
            method.apply(self, args)
            start = now
        } else {
            timer = setTimeout(function () {
                loop.apply(self)
            }, 50)
        }
    }
}

/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
export function debounce(method, delay) {
    let timer = null
    return function () {
        let self = this,
            args = arguments
        timer && clearTimeout(timer)
        timer = setTimeout(function () {
            method.apply(self, args)
        }, delay)
    }
}

/**
 * 数组合并查重
 * @param first 数组
 * @param second 数组
 * @param field 查重字段
 * @returns {Function}
 */
export function mergecheck(first, second, field) {
    var temp = ""
    if (!field) {
        temp = sortObject(first.concat(second), "updated_at")
    } else {
        var map = new Map()
        first.forEach((v) => map.set(v[field], v))
        second.forEach((v) => map.set(v[field], v))
        temp = sortObject([...map.values()], "updated_at")
    }
    return temp
}

/**
 * 返回UTC时间字符串
 * @param date 时间
 * @returns utc时间
 */

export function toUTC(date) {
    // 确保date 最终为Date object
    date = new Date(date)
    // 加入"+08"来标示对应的时区
    return date.toISOString()
}

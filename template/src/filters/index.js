/**
 * Created by catscorpio on 2019-09-05.
 */
import Vue from "vue"

let filter = [
    {
        name: "comdify",
        /**
         * 千分制格式化
         * @param n
         * @returns {*}
         */
        callback: (n) => {
            n = n + ""
            var re = /\d{1,3}(?=(\d{3})+$)/g
            var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
                return s1.replace(re, "$&,") + s2
            })
            return n1
        },
    },
    {
        name: "jetLag",
        /**
         * 获取给定时间与当前时间之差
         * @param time
         * @returns {*}
         */
        callback: (time) => {
            time /= 1000000
            let jetLag = (new Date().getTime() - time) / 1000
            let second = parseInt(jetLag % 60),
                minute = parseInt((jetLag / 60) % 60),
                hour = parseInt((jetLag / 3600) % 24),
                day = parseInt((jetLag / 3600 / 24) % 30),
                month = parseInt((jetLag / 3600 / 24 / 30) % 12),
                year = parseInt(
                    new Number(jetLag / 3600 / 24 / 30 / 12).toFixed(2)
                )
            let str = ""
            if (year > 0) {
                str += year + "年"
            }
            if (month > 0) {
                str += month + "月"
            }
            if (day > 0) {
                if (year == 0) {
                    str += day + "天"
                }
            }
            if (hour > 0) {
                if (month == 0 && year == 0) {
                    str += hour + "小时"
                }
            }
            if (minute > 0) {
                if (day == 0 && month == 0 && year == 0) {
                    str += minute + "分钟"
                }
            }
            if (second > 0) {
                if (hour == 0 && day == 0 && month == 0 && year == 0) {
                    str += second + "秒"
                }
            }
            return str + "前"
        },
    },
    {
        name: "phoneNumber",
        /**
         * 手机号码部分显示
         * @param time
         * @returns {*}
         */
        callback: (phone) => {
            if (!phone) return ""
            let array = phone.split("@")
            let number = array[0]
            if (number) {
                let str1 = number.substr(0, 2)
                let str2 = number.substr(-2)
                let str3 = ""
                for (var i = 0; i < 3; i++) {
                    str3 += "*"
                }
                return str1 + str3 + str2 + "@" + array[1]
            }
            return ""
        },
    },
    {
        name: "dateFormat",
        /**
         * 格式化日期
         * @param time
         * @returns {*}
         */
        callback: (inputTime) => {
            if (!inputTime) return ""
            var date = new Date(inputTime * 1000)
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? "0" + m : m
            var d = date.getDate()
            d = d < 10 ? "0" + d : d
            var h = date.getHours()
            h = h < 10 ? "0" + h : h
            var minute = date.getMinutes()
            var second = date.getSeconds()
            minute = minute < 10 ? "0" + minute : minute
            second = second < 10 ? "0" + second : second
            return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
        },
    },
]

filter.forEach((v) => Vue.filter(v.name, v.callback))

export default filter

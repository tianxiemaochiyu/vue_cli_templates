import Vue from "vue";

/**
 * Created by catscorpio on 2019/3/20.
 */
let filter = [{
    name: 'comdify',
    /**
     * 千分制格式化
     * @param n
     * @returns {*}
     */
    callback: (n) => {
        n = n + '';
        var re = /\d{1,3}(?=(\d{3})+$)/g;
        var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
            return s1.replace(re, "$&,") + s2;
        });
        return n1;
    }
}, {
    name: 'jetLag',
    /**
     * 获取给定时间与当前时间之差
     * @param time
     * @returns {*}
     */
    callback: (time) => {
        time /= 1000000;
        let jetLag = (new Date().getTime() - time) / 1000;
        let second = parseInt(jetLag % 60),
            minute = parseInt((jetLag / 60) % 60),
            hour = parseInt((jetLag / 3600) % 24),
            day = parseInt((jetLag / 3600 / 24) % 30),
            month = parseInt((jetLag / 3600 / 24 / 30) % 12),
            year = parseInt(new Number((jetLag / 3600 / 24 / 30) / 12).toFixed(2));
        let str = ''
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
        return str + '前'
    }
}];

filter.forEach(v => Vue.filter(v.name, v.callback));
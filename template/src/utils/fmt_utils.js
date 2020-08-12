const BigNumber = require("bignumber.js")

export function fmtNumber(number, decimals) {
    if (!decimals) {
        return new BigNumber(number).toString()
    }
    decimals = parseInt(decimals)
    let str = new BigNumber(number).toFixed(decimals ? decimals : 8, 1)
    return str.length > 10 ? str.substr(0, 10) : str
}

export function fmtDate(date) {
    date = new Date(date)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var h = date.getHours()
    var m1 = date.getMinutes()
    // var s = date.getSeconds();
    m = m < 10 ? "0" + m : m
    d = d < 10 ? "0" + d : d
    h = h < 10 ? "0" + h : h
    m1 = m1 < 10 ? "0" + m1 : m1
    return y + "-" + m + "-" + d + " " + h + ":" + m1
}

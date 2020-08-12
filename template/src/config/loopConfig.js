export default {
    userAccount: {
        // 获取用户资产列表
        timeInterval: 30000, // 轮询间隔（毫秒） 只能在此变量中配置，不应该外层修改
        callback: null, // 轮询执行的函数 必须传入一个promise对象！！！
        previousLoopTimestamp: 1832676336581, // 上一次轮询的时间（为防止在初次回调还未发生时，调了其他的add或者remove触发了轮询检查，导致重复轮询的问题，此处设置了一个极大的值）
    },
}

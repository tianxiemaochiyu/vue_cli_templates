import loopConfig from "./../config/loopConfig"
class Loop {
    constructor(config) {
        this.config = config // 轮询的接口配置
        this.loopList = [] // 轮询队列 目前已经按执行顺序先后来添加的
        this.timer = null // 唯一一个timer
    }
    listLoop() {
        // 轮询检查
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
        if (this.loopList.length === 0) {
            // 当前没有需要轮询的接口
            return
        }
        const now = new Date().getTime()
        const first = this.config[this.loopList[0]]
        let interval = first.previousLoopTimestamp + first.timeInterval - now // 最近一次的轮询执行距离现在的时间，作为定时器入参
        if (interval <= 0) interval = 0
        if (interval > 3600000) {
            // 非常大的值，會出BUG，settimeout莫名其妙執行了
            interval = 3600000
        }
        this.timer = setTimeout(() => {
            first.previousLoopTimestamp = new Date().getTime() + 10000000000 // 为防止在回调还未发生时，调了其他的add或者remove触发了轮询检查，导致重复轮询的问题，此处增加了一个极大的值
            first
                .callback()
                .then(() => {
                    // callback返回后的回调中重置时间、排序轮询队列、执行轮询检查
                    first.previousLoopTimestamp = new Date().getTime() // 刷新上次轮询时间
                    this.sortLoopList()
                    this.listLoop()
                })
                .catch((error) => {
                    first.previousLoopTimestamp = new Date().getTime()
                    this.sortLoopList()
                    this.listLoop()
                    console.log(error)
                    console.error("%s,轮询失效", this.loopList[0])
                })
            this.sortLoopList()
            this.listLoop()
        }, interval)
    }
    addLoop(name, callback, canFirstExecute) {
        // 增加一个轮询
        if (!this.config[name]) {
            throw new Error("添加轮询的name在配置中不存在")
        }
        this.config[name].callback = callback
        if (!canFirstExecute) {
            // 添加时是否执行第一次
            this.config[name].previousLoopTimestamp = new Date().getTime() // 默认认为添加时刚刚执行了一次，存下添加时的时间作为上一次循环时间戳
            this.loopList.indexOf(name) === -1 && this.loopList.push(name) // 已存在只修改配置，不重复加入队列
            this.sortLoopList()
            this.listLoop()
            return
        }
        this.config[name].previousLoopTimestamp =
            new Date().getTime() + 11000000000
        this.loopList.indexOf(name) === -1 && this.loopList.push(name) // 已存在只修改配置，不重复加入队列
        return new Promise((resolve, reject) => {
            callback()
                .then((res) => {
                    this.config[
                        name
                    ].previousLoopTimestamp = new Date().getTime() // 默认认为添加时刚刚执行了一次，存下添加时的时间作为上一次循环时间戳
                    this.sortLoopList()
                    this.listLoop()
                    resolve(res)
                })
                .catch((err) => {
                    this.config[
                        name
                    ].previousLoopTimestamp = new Date().getTime() // 默认认为添加时刚刚执行了一次，存下添加时的时间作为上一次循环时间戳
                    this.sortLoopList()
                    this.listLoop()
                    reject(err)
                })
        })
    }
    removeLoop(name) {
        // 删除一个轮询
        const index = this.loopList.indexOf(name)
        if (index > -1) {
            this.config[name].callback = null
            this.config[name].previousLoopTimestamp = 1832676336581
            this.loopList.splice(index, 1)
            this.listLoop()
        }
    }
    sortLoopList() {
        this.loopList.sort((a, b) => {
            // 根据执行的时间排个序 近=》远
            return (
                this.config[a].timeInterval +
                this.config[a].previousLoopTimestamp -
                (this.config[b].timeInterval +
                    this.config[b].previousLoopTimestamp)
            )
        })
    }
}

export default new Loop(loopConfig)

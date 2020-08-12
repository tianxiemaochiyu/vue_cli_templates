import axios from "./axios"
import api from "./api"
import Const from "./const"

window.GLOBAL.ajax = axios

export default {
    install: (Vue) => {
        Vue.prototype.$api = api
        Vue.prototype.$ajax = axios
        Vue.prototype.$const = Const
    },
}

import Vue from "vue"
import Vuex from "vuex"
import { VUEX_DEFAULT_CONFIG } from "@/config"
import Store from "@/store"

Vue.use(Vuex)

export default new Vuex.Store({
    ...Store,
    ...VUEX_DEFAULT_CONFIG,
})

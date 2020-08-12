import Vue from "vue"
import Router from "vue-router"
import ROUTES from "@/router/index"
import { ROUTER_DEFAULT_CONFIG } from "@/config/index"
import { routerBeforeEachFunc } from "@/interceptors/router"
import { routerAfterEachFunc } from "@/interceptors/router"

Vue.use(Router)

// 注入默认配置和路由表
let routerInstance = new Router({
    ...ROUTER_DEFAULT_CONFIG,
    routes: ROUTES,
})
// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc)
routerInstance.afterEach(routerAfterEachFunc)

export default routerInstance

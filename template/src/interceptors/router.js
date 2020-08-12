import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css" // progress bar style
import store from "@/plugins/store"

NProgress.configure({
    showSpinner: false,
}) // NProgress Configuration

export function routerBeforeEachFunc(to, from, next) {
    // 这里可以做页面拦截，也可以在这里面做权限处理
    NProgress.start()
    if (to.matched.some((r) => r.meta.requireAuth)) {
        // 需要鉴权才能进入的页面
        if (store.state.account.tokens.token) {
            // 已经登录
            next()
        } else {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath,
                },
            })
            NProgress.done()
        }
    } else {
        next()
    }
}

export function routerAfterEachFunc() {
    NProgress.done() // finish progress bar
}

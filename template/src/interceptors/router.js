import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({
    showSpinner: false
}) // NProgress Configuration

export function routerBeforeEachFunc(to, from, next) {
    // 这里可以做页面拦截，也可以在这里面做权限处理
    NProgress.start();
    next()
}
// eslint-disable-next-line
export function routerAfterEachFunc(to) {
    NProgress.done(); // finish progress bar
}
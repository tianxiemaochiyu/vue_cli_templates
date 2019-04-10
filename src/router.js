import Vue from 'vue'
import Router from 'vue-router'
import {
    routerBeforeEachFunc,
    routerAfterEachFunc
} from '@/interceptors/router'

Vue.use(Router);

const routerInstance = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ './views/Home/Index.vue')
        }, {
            path: '/404',
            name: '404',
            component: () =>
                import ( /* webpackChunkName: "404" */ './views/Error/Index')
        }, {
            path: '*',
            redirect: '/404'
        },
    ]
});

routerInstance.beforeEach(routerBeforeEachFunc);
routerInstance.afterEach(routerAfterEachFunc);

export default routerInstance

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ROUTER_DEFAULT_CONFIG } from "@/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(ROUTER_DEFAULT_CONFIG.baseURL),
  routes,
});

export default router;

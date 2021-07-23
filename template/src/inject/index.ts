import { httpRestApi, ApiObject, HttpAxiosInstance, axiosInstance } from "@/plugins/http";
import { App } from "vue";
import IconSvg from "@/components/IconSvg.vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: ApiObject;
    $axios: HttpAxiosInstance;
  }
}

export default {
  install: (app: App): void => {
    app.config.globalProperties.$http = httpRestApi;
    app.config.globalProperties.$axios = axiosInstance;
    app.component("icon-svg", IconSvg);
  },
};

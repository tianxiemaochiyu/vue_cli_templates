import { createApp } from "vue";
import App from "@/views/App.vue";
import router from "@/router";
import store from "@/store";
import Inject from "@/inject";

createApp(App).use(Inject).use(store).use(router).mount("#app");

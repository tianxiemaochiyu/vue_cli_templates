import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'babel-polyfill'
import VueI18n from 'vue-i18n'
import inject from '@/plugins/inject'
import '@/plugins/element'
import '@/plugins/rem'
import '@/plugins/icons'
import '@/filters'

import en_US from '@/locale/en-US.json'
import zh_CN from '@/locale/zh-CN.json'

window.GLOBAL = {};
window.GLOBAL.vbus = new Vue();

Vue.use(inject);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en_US',
    messages: {
        en_US: en_US,
        zh_CN: zh_CN
    }
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n: i18n,
    render: h => h(App)
}).$mount('#app');

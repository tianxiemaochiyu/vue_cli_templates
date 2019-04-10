import axios from '@/plugins/axios'
import api from '@/plugins/api'
export default {
  install: (Vue) => {
      Vue.prototype.$api = api;
      Vue.prototype.$ajax = axios;
  }
}

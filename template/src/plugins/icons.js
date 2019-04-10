import Vue from 'vue'
import IconSvg from '@/components/IconSvg';// svg组件
// register globally

Vue.component('IconSvg', IconSvg);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('../assets/icons', false, /\.svg$/);
requireAll(req);

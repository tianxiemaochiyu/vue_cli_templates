/**
 * Created by catscorpio on 2019/3/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        global
    },
    getters
})
 
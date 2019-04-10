export default {
    state: {
        config: {},
        screenSize: getScreentSize(window.innerWidth)
    },
    mutations: {
        SET_CONFIG: (state, config) =>{
            state.config = config
        },
        SET_SCREEN_SIZE: (state, size) =>{
            state.screenSize = getScreentSize(size)
        }
    },
    actions: {
        SetConfig({commit}, config){
            commit('SET_CONFIG', config)
        },
        SetScreenSize({commit}, size){
            commit('SET_SCREEN_SIZE', size)
        }
    }
}

function getScreentSize(size) {
    let mode = 'lg'
    if(size <= 575.98){
        mode = 'xs'
    }else if(size <= 767.98){
        mode = 'sm'
    }else if(size <= 991.98){
        mode = 'md'
    }
    return mode
}

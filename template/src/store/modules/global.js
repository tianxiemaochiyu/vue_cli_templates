import { setLocalStore, getLocalStore } from "@/utils/storage"

const global = {
    state: {
        mode: getLocalStore("theme-mode")
            ? getLocalStore("theme-mode")
            : (setLocalStore("theme-mode", "dark"), "dark"),
        language: getLocalStore("local_language") || "zh-CN", // 当前语言
        scroll_status: false,
        device: "pc",
    },
    mutations: {
        SET_SCROLL_STATUS: (state, status) => {
            state.scroll_status = status
        },
        SET_LOCALE: (state, locale) => {
            if (locale === "zh-CN") {
                state.locale = "zh-CN"
            } else {
                state.locale = "en"
            }
            state.language = locale
        },
        SET_THEME_MODE: (state, mode) => {
            state.mode = mode
            setLocalStore("theme-mode", mode)
        },
        SET_DEVICE: (state, device) => {
            state.device = device
        },
    },
    actions: {
        SetThemeMode({ commit }, mode) {
            commit("SET_THEME_MODE", mode)
        },
        SetScrollStatus({ commit }, status) {
            commit("SET_SCROLL_STATUS", status)
        },
        SetLocale({ commit }, locale) {
            commit()
            setLocalStore("local_language", locale)
        },
        SetDevice({ commit }, device) {
            commit("SET_DEVICE", device)
        },
    },
}

export default global

import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 持久化到本地存储 避免刷新组件后token失效
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})

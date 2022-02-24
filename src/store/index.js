import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTAO_USER'
export default new Vuex.Store({
  state: {
    // 存储用户信息
    user: getItem(TOKEN_KEY)
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为防止丢失数据将token存储到本地中
      setItem(TOKEN_KEY, state.user)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})

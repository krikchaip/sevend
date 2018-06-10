import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

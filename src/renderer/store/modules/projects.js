import _ from 'ramda'
import { remote } from 'electron'

const { getGlobal: G } = remote

export default {
  namespaced: true,
  actions: {
    async _set({ commit }, value) {
      await G('data').set('appProjects', value)
      commit('SET_PROJECTS', value, { root: true })
    },
    async create({ dispatch, rootState }, projectDetail) {
      await dispatch('_set', rootState.appProjects.concat([ projectDetail ]))
      console.log(rootState.appProjects)
    },
    async update({ dispatch, rootState }, { idx, value }) {
      await dispatch('_set', _.update(idx, value, rootState.appProjects))
      console.log(rootState.appProjects)
    },
    async unbind({ dispatch, rootState }, idx) {
      await dispatch('_set', _.remove(idx, 1, rootState.appProjects))
      console.log(rootState.appProjects)
    }
  }
}

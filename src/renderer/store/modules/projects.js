import { remote } from 'electron'

const { getGlobal: G } = remote

export default {
  namespaced: true,
  actions: {
    async create({ commit, rootState }, projectDetail) {
      let appProjects = rootState.appProjects.concat([ projectDetail ])
      G('data').set('appProjects', appProjects)
      commit('SET_PROJECTS', appProjects, { root: true })
      console.log(rootState.appProjects)
    }
  }
}

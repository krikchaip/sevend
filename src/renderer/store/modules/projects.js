export default {
  namespaced: true,
  actions: {
    async create({ commit, rootState }, projectDetail) {
      console.log(rootState.appProjects)
      commit('ADD_PROJECTS', projectDetail, { root: true })
    }
  }
}

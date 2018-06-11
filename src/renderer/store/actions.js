import { remote } from 'electron'

export default {
  async init({ commit }) {
    commit('SET_PROJECTS', remote.getGlobal('data').get('appProjects'))
  }
}

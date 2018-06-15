import { remote } from 'electron'

const { getGlobal: G } = remote

export default {
  async init({ commit }) {
    commit('SET_PROJECTS', G('data').get('appProjects'))
  }
}

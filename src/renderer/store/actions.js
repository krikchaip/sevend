import { remote } from 'electron'

const { getGlobal: G } = remote

export default {
  async init({ commit, state }) {
    commit('SET_PROJECTS', G('data').get('appProjects'))
    console.log(state.appProjects)
  },
  async notify({ commit }, { message, duration }) {
    commit('SET_SNACKBAR_MESSAGE', message)
    commit('SET_SNACKBAR_DURATION', duration)
    commit('SET_SNACKBAR_ACTIVE', true)
  }
}

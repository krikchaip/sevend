import Vue from 'vue'

export default {
  SET_PROJECTS(state, value) { state.appProjects = value },

  SET_MONITORING(state, { key, value }) { state.appMonitoring[key] = value },
  REMOVE_MONITORING(state, key) { Vue.delete(state.appMonitoring, key) },

  SET_SNACKBAR_ACTIVE(state, value) { state.appSnackbar.active = value },
  SET_SNACKBAR_DURATION(state, value) { state.appSnackbar.duration = value },
  SET_SNACKBAR_MESSAGE(state, value) { state.appSnackbar.message = value },

  SET_APP_MENU(state, value) { state.appMenu = value }
}

export default {
  SET_PROJECTS(state, value) { state.appProjects = value },
  SET_SNACKBAR_ACTIVE(state, value) { state.appSnackbar.active = value },
  SET_SNACKBAR_DURATION(state, value) { state.appSnackbar.duration = value },
  SET_SNACKBAR_MESSAGE(state, value) { state.appSnackbar.message = value },
}

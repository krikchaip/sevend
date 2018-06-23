import _ from 'ramda'
import { spawn } from 'child_process'

export default {
  namespaced: true,
  actions: {
    async compose_up({ commit, dispatch }, project_data) {
      // creating docker-compose up process
      let project_instance =
        spawn('docker-compose', ['-f', project_data.compose_path, 'up', '--no-color'])

      // register state to vuex first(make it reactive)
      let newState = {
        key: project_data.project_name,
        value: {
          isRunning: true,
          project_path: project_data.project_path,
          compose_path: project_data.compose_path
        }
      }

      commit('SET_MONITORING', newState, { root: true })

      let app = window.PROJECT[project_data.project_name]
              = { logs: [], project_instance }

      project_instance.stdout.on('data', buffer => app.logs.push(buffer.toString()))
      project_instance.stderr.on('data', buffer => app.logs.push(buffer.toString()))

      await dispatch('notify', {
        message: `${project_data.project_name} has started!`,
        duration: 3000
      }, { root: true })
    },
    async compose_down({ commit, dispatch }, data) {
      let { project_name: name, compose_path: path } = data
      let compose_down_instance =
        spawn('docker-compose', ['-f', path, 'down'])

      commit('REMOVE_MONITORING', name, { root: true })

      window.PROJECT[name].project_instance.kill()
      delete window.PROJECT[name]

      // compose_down_instance.kill()
      await dispatch('notify', {
        message: `${name} has stopped!`,
        duration: 3000
      }, { root: true })
    }
  }
}

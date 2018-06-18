<template>
  <v-menu left :nudge-bottom="50">
    <v-btn icon slot="activator">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile @click="importComposeFile">
        <v-list-tile-title>From existing compose file</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  import _ from 'ramda'
  import { loadComposeConfig } from 'lib/utils'
  import { remote } from 'electron'
  import { ValidationError } from 'lib/error'
  import Future from 'fluture'

  const { dialog, getCurrentWindow } = remote

  /** `openComposeFileDialog :: Future e String` */
  const openComposeFileDialog = Future((_, res) => {
    dialog.showOpenDialog(getCurrentWindow(), {
      title: 'Create from existing compose file',
      buttonLabel: 'Import',
      filters: [ { name: 'docker-compose', extensions: [ 'yml', 'yaml' ] } ],
      properties: [ 'openFile' ]
    }, paths => {
      !!paths && res(paths[0])
    })
  })

  /** `addProjectPath :: String -> Object -> Object` */
  const addProjectPath = _.pipe(
    _.split('/'),
    _.dropLast(1),
    _.join('/'),
    _.assoc('project_path')
  )

  /** `addProjectName :: String -> Object -> Object` */
  const addProjectName = _.pipe(
    _.split('/'),
    _.nth(-2),
    _.assoc('project_name')
  )

  /** `pluckContains :: String k => k -> a -> [{ k: a }] -> Boolean` */
  const pluckContains = prop => item =>
    _.pipe(_.pluck(prop), _.contains(item))

  /**
   * `guardDuplicatedPath :: [Project] -> Project -> Future ValidationError Project`
   *
   * `type Project = { project_path: String, ... }`
   */
  const guardDuplicatedPath = projects => data =>
    pluckContains('project_path')(data.project_path)(projects)
    ? Future.reject(new ValidationError(
      'Selected path is used by other project!'))
    : Future.of(data)

  export default {
    name: 'ProjectsButtonCreate',
    methods: {
      importComposeFile() {
        openComposeFileDialog
        .chain(composePath =>
          loadComposeConfig(composePath)
          .map(_.assoc('compose_path', composePath))
          .map(addProjectPath(composePath))
          .map(addProjectName(composePath)))
        .chain(guardDuplicatedPath(this.$store.state.appProjects))
        .fork(e => this.$emit('import-error', e),
              v => {
                this.$emit('import-success', 'Project has been imported')
                this.$store.dispatch('projects/create', v) })
      }
    }
  }
</script>

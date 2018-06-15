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
  import { remote } from 'electron'
  import fs from 'fs'
  import Future from 'fluture'
  import yaml from 'js-yaml'

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

  /**
   * `readFileM :: Path -> Options -> Future e Buffer`
   *
   * ps. "Path" and "Options" are from fs.readFile
   */
  const readFileM = Future.encaseN2(fs.readFile)

  /** `parseYaml :: String -> Future YAMLException Object` */
  const parseYaml = s =>
    Future.encase(yaml.safeLoad, s)
    .mapRej(_.assoc('message', 'Compose file corrupted'))

  /** `loadComposeConfig :: String -> Future e Object` */
  const loadComposeConfig = composePath =>
    readFileM(composePath, 'utf8')
    .chain(parseYaml)

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

  export default {
    name: 'ProjectsButtonCreate',
    methods: {
      importComposeFile() {
        openComposeFileDialog
        .chain(composePath =>
          loadComposeConfig(composePath)
          .map(addProjectPath(composePath))
          .map(addProjectName(composePath)))
        .fork(e => this.$emit('import-error', e),
              v => {
                this.$emit('import-success', 'Project has been imported')
                this.$store.dispatch('projects/create', v) })
      }
    }
  }
</script>

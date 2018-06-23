<template>
  <div>
    <v-btn
      icon
      :disabled="project_instance && project_instance.isRunning"
      @click="startProject"
    >
      <v-icon>mdi-play</v-icon>
    </v-btn>
    <v-btn icon @click="refreshButtonClick">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn icon @click="openFolder(project.project_path)">
      <v-icon>mdi-folder-open</v-icon>
    </v-btn>
    <projects-button-unbind
      :name="project_name"
      :unbind-project="() => $store.dispatch('projects/unbind', idx)"
    />
  </div>
</template>

<script>
  import _ from 'ramda'
  import { loadComposeConfig } from 'lib/utils'
  import { mapState } from 'vuex'
  import { shell } from 'electron'

  export default {
    name: 'ProjectsToolsItem',
    components: {
      ProjectsButtonUnbind: require('@/components/ProjectsButtonUnbind').default
    },
    props: {
      idx: { type: Number, required: true }
    },
    computed: {
      ...mapState({
        project({ appProjects }) { return appProjects[this.idx] },
        project_name({ appProjects }) { return appProjects[this.idx].project_name },
        project_instance({ appMonitoring }) { return appMonitoring[this.project_name] }
      })
    },
    methods: {
      refreshButtonClick() {
        let metaData = _.pick(
          ['compose_path', 'project_path', 'project_name'],
          this.project
        )
        loadComposeConfig(metaData.compose_path)
        .map(_.mergeDeepRight(metaData))
        .fork(
          ({ message }) =>
            this.$store.dispatch('notify', { message, duration: 0 }),
          value =>
            this.$store.dispatch('projects/update', { idx: this.idx, value }))
      },
      openFolder(path) {
        shell.openItem(path)
      },
      async startProject() {
        await this.$store.dispatch('monitor/compose_up', this.project)
        this.$router.replace('/monitor')
      }
    }
  }
</script>

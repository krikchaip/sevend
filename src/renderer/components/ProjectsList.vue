<template>
  <v-container fill-height>
    <projects-empty-state v-if="!$store.state.appProjects.length"/>
    <v-layout
      v-else
      justify-center
    >
      <v-flex xs9>
        <v-subheader>Imported</v-subheader>
        <v-card>
          <v-list two-line>
            <v-list-tile
              v-for="(data, idx) of $store.state.appProjects"
              :key="idx"
              @click="$router.replace({ name: 'projects-item', params: { idx } })"
            >
              <v-list-tile-avatar>
                <v-icon class="deep-orange lighten-2 white--text">mdi-cube-outline</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ data.project_name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ data.project_path }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  v-if="
                    $store.state.appMonitoring[data.project_name]
                    ? $store.state.appMonitoring[data.project_name].isRunning
                    : false
                  "
                  icon flat
                  color="error"
                  @click.stop="$store.dispatch('monitor/compose_down', data)"
                >
                  <v-icon>mdi-stop-circle-outline</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'ProjectsList',
    components: {
      ProjectsEmptyState: require('@/components/ProjectsEmptyState').default
    }
  }
</script>

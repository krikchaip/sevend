<template>
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
            replace
            :to="{ name: 'projects-item', params: { idx } }"
          >
            <v-list-tile-avatar>
              <v-icon class="blue lighten-2 white--text">mdi-docker</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ data.project_name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ data.project_path }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click="openFolder(data.project_path)">
                <v-icon color="grey lighten-1">mdi-folder-open</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { shell } from 'electron'

  export default {
    name: 'ProjectsList',
    components: {
      ProjectsEmptyState: require('@/components/ProjectsEmptyState').default
    },
    methods: {
      openFolder(path) { shell.openItem(path) }
    }
  }
</script>

<template>
  <projects-empty-state v-if="!$store.state.appProjects.length"/>
  <v-layout
    v-else
    justify-center
  >
    <v-flex xs9>
      <!-- <v-subheader>Imported</v-subheader> -->
      <v-card>
        <v-list two-line>
          <v-list-tile
            v-for="(project, idx) of $store.state.appProjects"
            :key="idx"
            @click=""
          >
            <v-list-tile-avatar>
              <v-icon class="blue lighten-2 white--text">mdi-docker</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ project.project_name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ project.project_path }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'ProjectsList',
    components: {
      ProjectsEmptyState: require('@/components/ProjectsEmptyState').default
    }
  }
</script>

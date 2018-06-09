<template>
  <v-app class="unselectable">
    <v-navigation-drawer
      app
      clipped
      width="250"
      style="z-index: 3"
      :permanent="menu"
    >
    </v-navigation-drawer>
    <v-toolbar
      app
      clipped-left
      dark
      color="info"
      height="56"
    >
      <v-toolbar-side-icon @click="menu = !menu">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>Projects</v-toolbar-title>
      <v-spacer/>
      <v-menu left :nudge-bottom="50">
        <v-btn icon slot="activator">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile @click="">
            <v-list-tile-title>New project</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-title>From existing compose file</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <empty-state-projects/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {
      EmptyStateProjects: require('@/components/EmptyStateProjects').default
    },
    data: () => ({
      menu: false
    })
  }
</script>

<style>
  @import url('assets/styles.css');
  @import url('/node_modules/@mdi/font/css/materialdesignicons.min.css');
</style>

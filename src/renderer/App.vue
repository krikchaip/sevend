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
      <projects-button-create
        @import-error="notifyError"
        @import-success="notifySuccess"
      />
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <projects-empty-state/>
        <v-snackbar
          v-model="snackbar"
          bottom
          right
          :timeout="3000"
        >
          {{ notifyMessage }}
          <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      ProjectsButtonCreate: require('@/components/ProjectsButtonCreate').default,
      ProjectsEmptyState: require('@/components/ProjectsEmptyState').default
    },
    data: () => ({
      menu: false,
      notifyMessage: null,
      snackbar: false
    }),
    methods: {
      notifyError(error) {},
      notifySuccess(message) {
        this.notifyMessage = message
        this.snackbar = true
      }
    }
  }
</script>

<style>
  @import url('assets/styles.css');
  @import url('/node_modules/@mdi/font/css/materialdesignicons.min.css');
</style>

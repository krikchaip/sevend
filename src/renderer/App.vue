<template>
  <v-app class="unselectable">
    <the-side-bar :visible="menu"/>
    <v-toolbar
      app
      clipped-left
      dark
      color="primary"
      height="56"
    >
      <v-toolbar-side-icon @click="menu = !menu">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-view name="title"/>
      </v-toolbar-title>
      <v-spacer/>
      <router-view class="ma-0" name="tools"/>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <router-view/>
      </v-container>
      <v-snackbar
        v-model="snackbar"
        bottom
        right
        :timeout="snackbarTimeout"
      >
        {{ notifyMessage }}
        <v-btn flat color="pink accent-2" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {
      TheSideBar: require('@/components/TheSideBar').default
    },
    data: () => ({
      menu: false,
      notifyMessage: null,
      snackbar: false,
      snackbarTimeout: 0
    }),
    created() {
      this.$store.dispatch('init')
    },
    methods: {
      notifyError({ message, name }) {
        console.error(message)
        this.notifyMessage = message
        this.snackbarTimeout = 0
        this.snackbar = true
      },
      notifySuccess(message) {
        this.notifyMessage = message
        this.snackbarTimeout = 3000
        this.snackbar = true
      }
    }
  }
</script>

<style>
  @import url('assets/styles.css');
  @import url('/node_modules/@mdi/font/css/materialdesignicons.min.css');
  @import url('/node_modules/roboto-fontface/css/roboto/roboto-fontface.css');
</style>

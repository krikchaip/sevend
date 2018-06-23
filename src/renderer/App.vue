<template>
  <v-app class="unselectable">
    <the-side-bar :visible="menu"/>
    <v-toolbar
      app
      clipped-left
      dark
      height="56"
      :color="determineColorFromRoute"
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
      <router-view/>
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
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      TheSideBar: require('@/components/TheSideBar').default
    },
    computed: {
      ...mapState({
        snackbarTimeout: ({ appSnackbar }) => appSnackbar.duration,
        notifyMessage: ({ appSnackbar }) => appSnackbar.message,
      }),
      menu: {
        get() { return this.$store.state.appMenu },
        set(v) { this.$store.commit('SET_APP_MENU', v) }
      },
      snackbar: {
        get() { return this.$store.state.appSnackbar.active },
        set(v) { this.$store.commit('SET_SNACKBAR_ACTIVE', v) }
      },
      determineColorFromRoute() {
        switch (this.$route.name) {
          case 'projects':
            return 'primary'
          case 'projects-item':
            return 'primary'
          case 'monitor':
            return 'teal'
          default:
            return 'primary'
        }
      }
    },
    created() {
      this.$store.dispatch('init')
    }
  }
</script>

<style>
  @import url('assets/styles.css');
  @import url('/node_modules/@mdi/font/css/materialdesignicons.min.css');
  @import url('/node_modules/roboto-fontface/css/roboto/roboto-fontface.css');
</style>

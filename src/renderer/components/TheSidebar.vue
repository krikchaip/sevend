<template>
  <v-navigation-drawer
    app
    clipped
    width="250"
    style="z-index: 3"
    :permanent="visible"
  >
    <v-list>
      <v-list-tile active-class replace to="/projects">
        <v-list-tile-avatar>
          <v-icon color="primary">mdi-folder-multiple</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>Projects</v-list-tile-title>
      </v-list-tile>
      <v-list-tile active-class replace to="/monitor">
        <v-list-tile-avatar>
          <v-icon color="teal">mdi-chart-arc</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>Monitor</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'TheSideBar',
    props: {
      visible: Boolean
    }
  }
</script>

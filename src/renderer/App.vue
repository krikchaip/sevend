<template>
  <v-app class="unselectable">
    <v-navigation-drawer
      app
      clipped
      fixed
      width="250"
      style="z-index: 3"
      :permanent="menu"
    >
    </v-navigation-drawer>
    <v-toolbar
      app
      clipped-left
      dark
      fixed
      color="info"
      height="56"
    >
      <v-toolbar-side-icon @click="menu = !menu">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>Menu Title</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-content>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, itaque?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, accusantium?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, adipisci!
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      menu: false
    })
  }
</script>

<style>
  @import url('assets/styles.css');
  @import url('/node_modules/@mdi/font/css/materialdesignicons.min.css');
</style>

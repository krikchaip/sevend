<template>
  <v-app class="unselectable">
    <v-toolbar
      app
      clipped-left
      dark
      color="info"
      height="56px"
    >
      <v-toolbar-side-icon @click="menu = !menu">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>Menu Title</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-navigation-drawer
      app
      clipped
      :permanent="menu"
    >
    </v-navigation-drawer>
    <v-content>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, odio!
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, aliquid.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, odio!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, odio!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, odio!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, odio!
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

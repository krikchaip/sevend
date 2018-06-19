<template>
  <v-container fill-height>
    <v-layout>
      <v-flex xs5>
        <v-subheader>Services</v-subheader>
        <v-card>
          <v-list>
            <v-list-tile
              v-for="(config, service) in data.services"
              :key="service"
              avatar
              @click="showConfig = config"
            >
              <v-list-tile-avatar>
                <v-icon class="blue lighten-2 white--text">mdi-docker</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>{{ service }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex pl-3 xs7>
        <v-card class="pa-3" height="100%">
          <div
            v-if="!showConfig"
            class="text-xs-center grey--text"
          >
            Click on the left to see service detail.
          </div>
          <vue-json-pretty
            v-else
            :data="showConfig"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ProjectsItem',
    props: {
      idx: { type: Number, required: true }
    },
    data: () => ({
      showConfig: null
    }),
    computed: {
      ...mapState({
        data({ appProjects }) { return appProjects[this.idx] }
      })
    }
  }
</script>

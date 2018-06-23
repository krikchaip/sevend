<template>
  <v-container fill-height>
    <monitor-empty-state v-if="!Object.keys($store.state.appMonitoring).length"/>
    <v-layout v-else>
      <v-flex style="flex: 0 0 250px">
        <v-card>
          <v-list dense>
            <v-subheader>Running</v-subheader>
            <v-list-tile
              v-for="(app_data, app_name) in $store.state.appMonitoring"
              :key="app_name"
              avatar
              @click="focusApp = app_name"
            >
              <v-list-tile-avatar size="36">
                <v-icon class="deep-orange lighten-2 white--text">mdi-cube-outline</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-title>{{ app_name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex pl-3>
        <v-card height="100%" color="grey darken-3">
          <v-tabs
            v-model="tabActive"
            dark
            color="teal"
            slider-color="yellow"
          >
            <v-tab href="#container_logs">container logs</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabActive">
            <v-tab-item
              id="container_logs"
              class="py-2 pl-2 grey darken-3"
              :style="logWindowSize"
            >
              <pre class="white--text" style="user-select: auto">{{ logs && logs.join('') }}</pre>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { setInterval, clearInterval } from 'timers';

  export default {
    name: 'MonitorPage',
    components: {
      MonitorEmptyState: require('@/components/MonitorEmptyState').default
    },
    data: () => ({
      tabActive: null,
      focusApp: null,
      logs: null,
      logTimer: null
    }),
    computed: {
      logWindowSize() {
        return {
          height: '514px',
          width: this.$store.state.appMenu ? '452px' : '602px',
          overflow: 'scroll'
        }
      }
    },
    created() {
      this.logTimer = setInterval(() => {
        console.log('logTimer')
        this.logs = this.focusApp
          ? window.PROJECT[this.focusApp].logs
          : []
      }, 1500)
    },
    beforeDestroy() {
      clearInterval(this.logTimer)
    }
  }
</script>

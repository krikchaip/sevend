<template>
  <div>
    <v-btn icon>
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <projects-button-unbind
      :name="project_name"
      :unbind-project="() => $store.dispatch('projects/unbind', idx)"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ProjectsToolsItem',
    components: {
      ProjectsButtonUnbind: require('@/components/ProjectsButtonUnbind').default
    },
    props: {
      idx: { type: Number, required: true }
    },
    computed: {
      ...mapState({
        project_name({ appProjects }) { return appProjects[this.idx].project_name }
      })
    }
  }
</script>

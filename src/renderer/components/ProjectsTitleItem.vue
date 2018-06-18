<template>
  <div class="d-flex">
    <router-link
      replace
      style="cursor: pointer"
      tag="span"
      to="/projects"
    >
      Projects
    </router-link>
    <v-icon class="mx-1">mdi-chevron-right</v-icon>
    <span>{{ data.project_name }}</span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ProjectsTitleItem',
    props: {
      idx: { type: Number, required: true }
    },
    computed: mapState({
      data(state) { return state.appProjects[this.idx] }
    })
  }
</script>


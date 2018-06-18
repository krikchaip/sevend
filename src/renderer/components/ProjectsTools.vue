<template>
  <div>
    <projects-button-create
      @import-error="notifyError"
      @import-success="notifySuccess"
    />
  </div>
</template>

<script>
  export default {
    name: 'ProjectsTools',
    components: {
      ProjectsButtonCreate: require('@/components/ProjectsButtonCreate').default
    },
    methods: {
      notifyError({ message, name }) {
        console.error(message)
        this.$store.dispatch('notify', { message, duration: 0 })
      },
      notifySuccess(message) {
        this.$store.dispatch('notify',{ message, duration: 3000 })
      }
    }
  }
</script>

<template>
  <div>
    <projects-button-create
      @import-error=""
      @import-success=""
    />
  </div>
</template>

<script>
  export default {
    name: 'ProjectsTools',
    components: {
      ProjectsButtonCreate: require('@/components/ProjectsButtonCreate').default
    }
  }
</script>

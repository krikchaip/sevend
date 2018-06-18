<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="290"
  >
    <v-btn icon slot="activator">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="title">Unbind {{ name }}?</v-card-title>
      <v-card-text class="py-0 body-1 grey--text text--darken-1">
        Your project's folder still remains,
        Only application cache will be removed.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="unbindButtonClick">Unbind</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'ProjectsButtonUnbind',
    props: {
      unbindProject: {
        type: Function,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    data: () => ({
      dialog: false
    }),
    methods: {
      unbindButtonClick() {
        this.dialog = false
        this.$router.replace({ path: '/projects' })
        this.unbindProject()
      }
    }
  }
</script>

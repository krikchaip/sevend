<template>
  <div class="d-flex">
    <span style="cursor: pointer" @click="">Projects</span>
    <v-icon class="mx-1">mdi-chevron-right</v-icon>
    <span>{{ $route.params.idx }}</span>
  </div>
</template>

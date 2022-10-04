<template>
  <div id="app">
    <RouterView name="default" />
  </div>
  
</template>

<script>


export default {
  name: 'App',
  created() {
    this.$store.dispatch('incidentes/getAllIncidentes')
  }
}
</script>

<style>
  @import "assets/main.scss";
</style>

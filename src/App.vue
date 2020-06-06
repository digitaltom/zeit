<template>
  <div id="app">
    <Counters :date="new Date().toISOString().split('T')[0]"/>
  </div>
</template>

<script>
import Counters from './components/Counters.vue'

export default {
  name: 'App',
  components: {
    Counters
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

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

@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

html {
  overflow-y: scroll;
}

body {
  background: #2F7789;
  font-size: 1.1em;
  margin: 0;
  padding: 0;
}

.hidden {
  display: none;
}

#app {
  font-family: 'Open Sans Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #CFD9B7;
  margin-top: 20px;
}
</style>

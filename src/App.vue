<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
    let config = JSON.parse(localStorage.getItem('config'))
    if ( config === null ) { config = {} }
    if ( config['timers'] === undefined ) { config['timers'] = {} }
    localStorage.setItem('config', JSON.stringify(config))
  }
}
</script>

<style>

/* Color palette:  */

@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

html {
  overflow-y: scroll;
}

body {
  font-family: 'Open Sans Condensed', sans-serif;
  background: #2F7789;
  color: #CFD9B7;
  font-size: 1.1em;
  margin: 0;
  padding: 0;
}

.hidden {
  display: none;
}

button {
  cursor: pointer;
}

.icon {
  opacity: 0.7;
  width: 40px;
  cursor: pointer;
  transition: 0.3s;
}

.icon.small {
  width: 20px;
}

.icon:hover {
  opacity: 0.9;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 20px;
}
</style>

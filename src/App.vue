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
  name: 'App'
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
  font-family: 'Open Sans Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #CFD9B7;
  margin-top: 20px;
}
</style>

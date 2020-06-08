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

html, body {
    max-width: 100%;
    overflow-x: hidden;
}

body {
  font-family: 'Open Sans Condensed', sans-serif;
  background: #2F7789;
  color: #CFD9B7;
  font-size: 1.1em;
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 20px;
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

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
}

input, .new-timer-modal select {
  margin: 0 10px 0 10px;
  border-radius: 3px;
  border: none;
}

input {
  padding: 5px;
  box-sizing: border-box;
}

select {
  padding: 2px 10px;
  box-sizing: border-box;
}

button {
  margin: 20px 10px 20px 10px;
  padding: 10px;
  background-color: #fff;
  color: #9BA684;
  border-radius: 2px;
  border: none;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  position: relative;
  display: inline-flex;
  cursor: pointer;
}
input[type="checkbox"] + label:before {
  width: 30px;
  height: 15px;
  margin-top: 5px;
  border-radius: 15px;
  border: 1px solid #ddd;
  background-color: #EEE;
  content: "";
  margin-right: 7px;
  transition: background-color 0.5s linear;
}
input[type="checkbox"] + label:after {
  width: 15px;
  height: 15px;
  margin-top: 5px;
  border-radius: 15px;
  background-color: #fff;
  content: "";
  transition: margin 0.1s linear;
  box-shadow: 0px 0px 2px #aaa;
  position: absolute;
  left: 1px;
  top: 1px;
}
input[type="checkbox"]:checked+label:before{
  background-color: #4EA1AE;
}
input[type="checkbox"]:checked+label:after {
  margin: 5px 0 0 15px;
}

</style>

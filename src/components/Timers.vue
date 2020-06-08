<template>
  <div class="timers">

    <h2>{{headline}}</h2>
    <router-link :to="{ name: 'stats', params: {} }">
      <img class="icon small" src="../assets/icons/line-graph.svg" alt="Timer statistics">
    </router-link>
    <div class="timer-list flex-center">
      <template v-for="timer in timers">
        <timer v-bind:key="timer" :name="timer" :date="date"/>
      </template>
    </div>
    <div>
      <img class="icon" v-on:click='$modal.show("new")' src="../assets/icons/circle-with-plus.svg" alt="Add Timer">
    </div>

    <modal name="new" height="auto" :scrollable="true"
      :adaptive="true" classes="new-timer-modal">
      <div class="new-timer-modal">
        <h2>Add Timer</h2>

        <ul>
          <li>
            <b>Name:</b>
            <input name="name" class="" v-model.trim="new_timer.name" maxlength="40">
          </li>
          <li>
            <b>Color:</b>
            <select name="color" v-model.trim="new_timer.color">
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </li>
          <li>
            <input type="checkbox" name="stats" class="" v-model.trim="new_timer.stats">
            Collect statistics for this timer
          </li>
          <li>
            <input type="checkbox" name="default" class="" v-model.trim="new_timer.default">
            Add timer by default each day
          </li>
        </ul>

        <button class="" @click="$modal.hide('new'); addTimer()">
          Add Timer
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import Timer from '../components/Timer.vue'

export default {
  name: 'Timers',
  components: {
    Timer
  },
  props: {
    date: {
      type: String,
      default: new Date().toISOString().split('T')[0] // date in format yyyy-mm-dd
    }
  },
  data () {
    return {
      timers: [],
      new_timer: {},
      headline: 'Todays Timers'
    }
  },
  created: function () {
    console.log('Timers for: ' + this.date)
    if (localStorage.getItem(this.date) === null) { localStorage.setItem(this.date, JSON.stringify({})) }
    this.timers = Object.keys(JSON.parse(localStorage.getItem(this.date)))
    if (this.timers.length === 0) { this.timers.push(' ') }
    this.clearAllTimers()
    if (this.date !== new Date().toISOString().split('T')[0]) { this.headline = "Timers for " + this.date}
  },
  methods: {
    clearAllTimers() {
      var id = window.setTimeout(function() {}, 0)
      while (id--) {
        window.clearTimeout(id)
      }
    },
    addTimer() {
      if ( this.new_timer.name === undefined ) { this.new_timer.name = ' ' }
      if ( !this.timers.includes(this.new_timer.name) ) { this.timers.push( this.new_timer.name ) }
      let config = JSON.parse(localStorage.getItem('config'))
      if ( config['timers'][this.new_timer.name] === undefined ) { config['timers'][this.new_timer.name] = {} }
      config['timers'][this.new_timer.name]['color'] = this.new_timer.color
      config['timers'][this.new_timer.name]['stats'] = this.new_timer.stats
      config['timers'][this.new_timer.name]['default'] = this.new_timer.default
      localStorage.setItem('config', JSON.stringify(config))
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
}

</style>

<style scoped>

h2 {
}

.new-timer-modal {
  background: #2F7789;
}

.new-timer-modal ul {
  list-style-type: none;
}

.new-timer-modal li {
  margin: 10px;
}

.new-timer-modal input, .new-timer-modal select {
  margin: 0 10px 0 10px;
}

.new-timer-modal button {
  margin: 10px;
  padding: 10px;
  background-color: #0B3C53;
  color: #CFD9B7;
  border-radius: 2px;
  border: none;
}


</style>

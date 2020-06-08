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
    :adaptive="true" :maxWidth="400" :pivotY="0.3" classes="new-timer-modal">
      <h2>Add Timer</h2>

      <div class="option">
        <b>Name:</b>
        <input name="name" class="" v-model.trim="new_timer.name" maxlength="40">
      </div>
      <div class="option">
        <b>Color:</b>
        <select name="color" v-model.trim="new_timer.color">
          <option value="cyan">Cyan</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </div>

      <div class="option">
        <input type="checkbox" name="stats" id="form-stats" v-model.trim="new_timer.stats">
        <label for="form-stats">Collect statistics for this timer</label>
      </div>

      <div class="option">
        <input type="checkbox" name="default" id="form-default" v-model.trim="new_timer.default">
        <label for="form-default">Add timer by default each day</label>
      </div>

      <button class="" @click="$modal.hide('new'); addTimer()">
        Add Timer
      </button>

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
      new_timer: { color: 'cyan' },
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

.new-timer-modal {
  background-color: #2F7789;
  border-radius: 4px;
  border: 1px solid;
}

</style>

<style scoped>

.new-timer-modal .option {
  margin: 10px;
}

</style>

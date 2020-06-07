<template>
  <div class="timers">
    <h2>Today's timers</h2>
    <div class="timer-list flex-center">
      <Timer name="Arbeit" :date="date"/>
    </div>
    <div>
      <img class="icon" src="../assets/icons/circle-with-plus.svg" alt="Add Timer">
    </div>
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
  created: function () {
    console.log('Timers for: ' + this.date)
    if (localStorage.getItem(this.date) === null) { localStorage.setItem(this.date, JSON.stringify({})) }
    this.clearAllTimers()
  },
  methods: {
    clearAllTimers() {
      var id = window.setTimeout(function() {}, 0)
      while (id--) {
        window.clearTimeout(id)
      }
    }
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

</style>

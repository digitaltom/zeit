<template>
  <div class="counters">
    <h2>Counters for {{date}}</h2>
    <div class="counter-list">
      <Counter name="Arbeit" :date="date"/>
      <Counter name="Sport" :date="date"/>
      <Counter name="Lesen" :date="date"/>
    </div>
  </div>
</template>

<script>
import Counter from '../components/Counter.vue'

export default {
  name: 'Counters',
  components: {
    Counter
  },
  props: {
    date: String // date in format yyyy-mm-dd
  },
  created: function () {
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
<style scoped>
.counter-list {
  display: flex;
}
</style>

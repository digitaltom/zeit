<template>
  <div class="counters">
    <h2>Counters for {{date}}</h2>
    <Counter name="Arbeit" :date="date"/>
    <Counter name="Sport"/>
    <Counter name="Lesen"/>
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.counters {
  display: flex;
}
</style>

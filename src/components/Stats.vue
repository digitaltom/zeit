<template>
  <div class="stats">
    <h2>Statistics</h2>
    <pre>
      {{stats}}
    </pre>
  </div>
</template>

<script>

export default {
  name: 'Stats',
  props: {
  },
  data () {
    return {
      stats: {}
    }
  },
  created: function () {
    var component = this
    var keys = Object.keys(localStorage)
    keys.forEach(function (key) {
      component.stats[key] = localStorage.getItem(key)
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>

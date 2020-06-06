<template>
  <div class="counter">
    <a v-on:click='this.toggleStart'>
      <img class="counter" alt="Counter" src="../assets/clock.png">
      {{name}}
      {{duration}}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    name: String,
    date: String // date in format yyyy-mm-dd 
  },
  data () {
    return {
      state: 'new',
      start_at: undefined,
      end_at: undefined,
      duration: 0,
      timer: undefined
    }
  },
  computed: {
  },
  created: function () {
    // load data from localstorage
  },
  methods: {
    updateDuration: function () {
      this.duration = (new Date().getTime() - this.start_at) / 1000
      console.log('Updated duration to: ' + this.duration)
    },
    toggleStart: function () {
      if( this.state == 'new' ) {
        this.start_at = new Date().getTime()
        this.state = 'run'
        this.timer = setInterval(this.updateDuration, 1000)
        console.log('Started counter ' + this.name + ' with: ' + this.start_at)
      } else if (this.state == 'run') {
        this.state = 'pause'
        clearInterval(this.timer)
        this.end_at = new Date().getTime()
        console.log('Stopped timer ' + this.name + ' at : ' + this.end_at)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.counter {
  margin: 40px;
}
</style>

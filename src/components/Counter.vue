<template>
  <div class="counter">
    <a v-on:click='this.toggleStart'>
      {{name}}<br/>
      <img class="counter" alt="Counter" src="../assets/clock.png"><br/>
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
      duration: '00:00:00',
      timer: undefined,
      stages: []
    }
  },
  computed: {
  },
  created () {
    // load data from localstorage
    this.fromStorage()
    this.updateDuration()
    if (this.state() == 'run') { this.timer = setInterval(this.updateDuration, 500) }
  },
  methods: {
    state () {
      if (this.stages.length === 0) {
        return 'new'
      } else if (this.stages[this.stages.length - 1]['end_at'] === undefined) {
        return 'run'
      } else {
        return 'pause'
      }
    },
    toStorage () {
      var counterData = JSON.parse(localStorage.getItem(this.date))
      counterData[this.name] = this.stages
      localStorage.setItem(this.date, JSON.stringify(counterData))
      console.log('Storing ' + this.date + '/' + this.name + ', stages: ' + counterData[this.name])
    },
    fromStorage () {
      var storedData = localStorage.getItem(this.date)
      if (storedData !== null && JSON.parse(storedData)[this.name]) {
        this.stages = JSON.parse(storedData)[this.name]
      }
      console.log('Loaded ' + this.name + ', stages: ' + JSON.stringify(this.stages))
    },
    getTotalDuration () {
      return parseInt(this.stages.reduce((total, stage) => {
        var end = (stage['end_at'] === undefined ? new Date().getTime() : stage['end_at'] )
        var add = end - stage['start_at']
        return total + add
      }, 0) / 1000)
    },
    updateDuration () {
      var total = this.getTotalDuration()
      const hours = Math.floor(total / (60 * 60))
      const minutes = Math.floor(total / 60) % 60
      const seconds = Math.floor(total % 60)
      this.duration = `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`
    },
    toggleStart () {
      if( this.state() == 'new' || this.state() == 'pause' ) {
        this.stages.push({ 'start_at': new Date().getTime() })
        this.timer = setInterval(this.updateDuration, 500)
      } else if (this.state() == 'run') {
        clearInterval(this.timer)
        this.stages[this.stages.length - 1]['end_at'] = new Date().getTime()
      }
      this.toStorage()
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.counter {
  margin: 40px;
}
</style>

<template>
  <div class="counter">
    <a v-on:click='this.toggleStart'>

      <div class="counter-session">{{name}}</div>
      <div class="counter-time">{{duration}}</div>

      <div class="play-pause">
        <span v-if="this.state == 'run'">
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M8.016.016H12v13.968H8.016V.016zM0 13.984V.016h3.984v13.968H0z" fill="#FFF" fill-rule="nonzero"/></svg>
        </span>
        <span v-else>
          <svg width="14" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0l14 9-14 9z" fill="#FFF" fill-rule="nonzero"/></svg>
        </span>
      </div>
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
    if (this.state == 'run') { this.timer = setInterval(this.updateDuration, 500) }
  },
  methods: {
    toStorage () {
      let counterData = JSON.parse(localStorage.getItem(this.date))
      counterData[this.name] = this.stages
      localStorage.setItem(this.date, JSON.stringify(counterData))
      console.log('Storing ' + this.date + '/' + this.name + ', stages: ' + JSON.stringify(counterData[this.name]))
    },
    fromStorage () {
      let storedData = localStorage.getItem(this.date)
      if (storedData !== null && JSON.parse(storedData)[this.name]) {
        this.stages = JSON.parse(storedData)[this.name]
      }
      this.setState()
      console.log('Loaded ' + this.name + ', stages: ' + JSON.stringify(this.stages))
    },
    setState () {
      if (this.stages.length === 0) {
        this.state = 'new'
      } else if (this.stages[this.stages.length - 1]['end_at'] === undefined) {
        this.state =  'run'
      } else {
        this.state = 'pause'
      }
    },
    getTotalDuration () {
      return parseInt(this.stages.reduce((total, stage) => {
        let end = (stage['end_at'] === undefined ? new Date().getTime() : stage['end_at'] )
        let add = end - stage['start_at']
        return total + add
      }, 0) / 1000)
    },
    updateDuration () {
      let total = this.getTotalDuration()
      let hours = Math.floor(total / (60 * 60))
      let minutes = Math.floor(total / 60) % 60
      let seconds = Math.floor(total % 60)
      this.duration = `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`
    },
    toggleStart () {
      if( this.state == 'new' || this.state == 'pause' ) {
        this.stages.push({ 'start_at': new Date().getTime() })
        this.timer = setInterval(this.updateDuration, 500)
      } else if (this.state == 'run') {
        clearInterval(this.timer)
        this.stages[this.stages.length - 1]['end_at'] = new Date().getTime()
      }
      this.setState()
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
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-flow: column wrap;
  width: 224px;
  height: 224px;
  border: 1px solid rgba(255, 255, 255, .75);
  border-radius: 50%;
  margin: 15px;
}

.counter::before, .counter::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: -100;
}

.counter::before {
  width: 82%;
  height: 82%;
  border: 1px solid rgba(255, 255, 255, .75);
}

.counter::after {
  width: 90%;
  height: 90%;
  border: 4px solid #54A89F;
}

.counter-session {
  font-weight: 500;
}

.counter-time {
  font-size: 2.5rem;
}

.play-pause {
  transition: border-color .15s ease;
  cursor: pointer;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 3rem;
}

.play-pause:hover {
  border-color: #fff;
}

</style>

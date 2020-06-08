<template>
  <div class="timer" :class="this.state + ' ' + this.config['color']">
    <div class="timer-name">{{name}}</div>
    <div class="timer-duration">{{duration}}</div>

    <div class="controls">
      <span v-on:click='this.toggleStart'>
        <template v-if="this.state == 'running'">
          <img class="icon" src="../assets/icons/pause.svg" alt="Pause timer">
        </template>
        <template v-else>
          <img class="icon" src="../assets/icons/play.svg" alt="Start timer">
        </template>
      </span>
      <div>
        <img class="icon small settings" src="../assets/icons/sound-mix.svg" alt="Timer settings">
      </div>

      <modal name="configure" height="auto" :scrollable="true"
        :adaptive="true" :maxWidth="400" :pivotY="0.3" classes="configure-timer-modal">
      <h2>Configure Timer</h2>

      <div class="option">
        <b>Name:</b>
        <input name="name" class="" v-model.trim="this.name" maxlength="40">
      </div>
      <div class="option">
        <b>Color:</b>
        <select name="color" >
          <option value="cyan">Cyan</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </div>

      <div class="option">
        <input type="checkbox" name="stats" id="form-stats">
        <label for="form-stats">Collect statistics for this timer</label>
      </div>

      <div class="option">
        <input type="checkbox" name="default" id="form-default">
        <label for="form-default">Add timer by default each day</label>
      </div>

      <button class="" @click="$modal.hide('configure'); addTimer()">
        Change Timer
      </button>
    </modal>

  </div>

</div>

</template>

<script>
export default {
  name: 'Timer',
  props: {
    name: String,
    date: String // date in format yyyy-mm-dd
  },
  data () {
    return {
      state: 'new',
      config: {},
      duration: '00:00:00',
      timer: undefined,
      stages: []
    }
  },
  computed: {
  },
  created () {
    // load data from localstorage
    this.loadStages()
    this.loadConfig()
    this.updateDuration()
    if (this.state == 'running') { this.timer = setInterval(this.updateDuration, 500) }
  },
  methods: {
    toStorage () {
      let timerData = JSON.parse(localStorage.getItem(this.date))
      timerData[this.name] = this.stages
      localStorage.setItem(this.date, JSON.stringify(timerData))
      console.log('Storing ' + this.date + '/' + this.name + ', stages: ' + JSON.stringify(timerData[this.name]))
    },
    loadStages () {
      let storedData = localStorage.getItem(this.date)
      if (storedData !== null && JSON.parse(storedData)[this.name]) {
        this.stages = JSON.parse(storedData)[this.name]
      }
      this.setState()
      console.log('Loaded stages for "' + this.name + '": ' + JSON.stringify(this.stages))
    },
    loadConfig () {
      let config = JSON.parse(localStorage.getItem('config'))
      if ( config['timers'][this.name] !== undefined ) {
        this.config = config['timers'][this.name]
      }
      console.log('Loaded config for "' + this.name + '": ' + JSON.stringify(this.config))
    },
    setState () {
      if (this.stages.length === 0) {
        this.state = 'new'
      } else if (this.stages[this.stages.length - 1]['end_at'] === undefined) {
        this.state =  'running'
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
      } else if (this.state == 'running') {
        clearInterval(this.timer)
        this.stages[this.stages.length - 1]['end_at'] = new Date().getTime()
      }
      this.setState()
      this.toStorage()
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time
    },
    showSettings() {
      // https://www.npmjs.com/package/vue-js-modal
      this.$modal.show('settings')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.timer {
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

.timer::before, .timer::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: -100;
}

.timer::before {
  width: 82%;
  height: 82%;
  border: 1px solid rgba(255, 255, 255, .75);
}

.timer::after {
  width: 90%;
  height: 90%;
  border: 6px solid;
  border-color: #54A89F;
}

.timer.cyan::after {
  border-color: #54A89F;
}

.timer.yellow::after {
  border-color: #E9D37F;
}

.timer.orange::after {
  border-color: #D86235;
}

.timer.red::after {
  border-color: #C73037;
}

.timer.green::after {
  border-color: #31998B;
}

.timer.blue::after {
  border-color: #229FAD;
}

.timer.running::after {
  -webkit-animation: animate 2s linear infinite;
  -moz-animation: animate 2s linear infinite;
  animation: animate 2s linear infinite;
  border-width: 1px;
  box-shadow: inset 0px 0px 0px;
}

@keyframes animate {
  0% { width: 82%; height: 82%; opacity: 0.5; }
  15% { opacity: 0.8;}
  85% { width: 95%; height: 95%; opacity: 1; border-width: 8px; box-shadow: inset 0px 0px 10px }
  100% { opacity: 0.5; }
}

.timer-name {
}

.timer-duration {
  font-size: 2.5rem;
}

.controls {
  margin: 0.5rem;
}

.settings {
  opacity: 0.3;
  transition: 0.3s;
}

</style>

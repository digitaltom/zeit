<template>
  <div class="stats">
    <h2>Statistics</h2>
    <router-link :to="{ name: 'timers', params: {date: '2020-06-06'} }">
      <img class="icon small" src="../assets/icons/time-slot.svg" alt="Timers">
    </router-link>

    <div class="chart center">
      <chartist
      ratio="ct-major-tenth"
      type="Bar"
      :data="chartData"
      :options="chartOptions">
      </chartist>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Stats',
  props: {
  },
  data () {
    return {
      stats: {},
      chartData: {
        labels: [],
        series: [
          [5, 4, 3, 7, 5, 10, 3],
          [3, 2, 9, 5, 4, 6, 4]
        ]
      },
      chartOptions: {
        seriesBarDistance: 10,
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 70
        }
      }
    }
  },
  created: function () {
    var component = this
    const labels = Object.keys(localStorage).filter(key => key.match(/\d+-\d+-\d+/))

    labels.sort().forEach(function (label) {
      component.chartData['labels'].push(label)
      // localStorage.getItem(label)
    })
  }
}
</script>

<style>

.ct-label {
  color: #CFD9B7 !important;
  font-size: 0.9rem !important;
}

</style>

<style scoped>

@import "../../node_modules/chartist/dist/chartist.css";

.chart {
  max-width: 500px;
}

.center {
  margin: auto;
  padding: 10px;
}

</style>

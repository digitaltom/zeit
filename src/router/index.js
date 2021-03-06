import Vue from 'vue'
import Router from 'vue-router'

import Timers from '../components/Timers'
import Stats from '../components/Stats'

Vue.use(Router)

// https://mattstauffer.co/blog/getting-started-using-vues-vue-router-for-single-page-apps

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/:date?',
      name: 'timers',
      component: Timers,
      props: true
    }
  ],
  // https://router.vuejs.org/guide/advanced/scroll-behavior.html
  scrollBehavior (to) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 10 }
      }
    }
  }
})

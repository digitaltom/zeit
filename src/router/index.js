import Vue from 'vue'
import Router from 'vue-router'

import Counters from '../components/Counters'
import Stats from '../components/Stats'

Vue.use(Router)

// https://mattstauffer.co/blog/getting-started-using-vues-vue-router-for-single-page-apps

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: { name: 'counters' }
    },
    {
      path: '/counters/:date?',
      name: 'counters',
      component: Counters,
      props: true
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
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

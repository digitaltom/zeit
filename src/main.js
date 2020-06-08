import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import router from './router'
import * as storage from './storage'

'use strict';

Vue.config.productionTip = false
Vue.prototype.$storage = storage

// https://github.com/euvl/vue-js-modal
Vue.use(VModal)

// https://github.com/Yopadd/vue-chartist#readme
// examples: https://gionkunz.github.io/chartist-js/examples.html
Vue.use(require('vue-chartist'), {
    messageNoData: "You have not enough data",
    classNoData: "empty"
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

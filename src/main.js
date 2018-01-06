// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Scroll from './components/scroll'
import VCharts from 'v-charts'

Vue.use(VCharts)

Vue.config.productionTip = false

const eventBus = {
  install (Vue, options) {
    Vue.prototype.$bus = new Vue()
  }
}
Vue.use(eventBus)

Vue.component('Scroll', Scroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

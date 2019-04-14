import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'

Vue.config.productionTip = false

new Vue({
  Store,
  Router,
  render: h => h(App),
}).$mount('#app')

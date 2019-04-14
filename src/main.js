import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Store from './store'

Vue.config.productionTip = false

new Vue({
  Store,
  router,
  render: h => h(App),
}).$mount('#app')

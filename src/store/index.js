import Vuex from 'vuex'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import account from './modules/account.js'

Vue.use(Vuex)
Vue.use(BootstrapVue)

export default new Vuex.Store({
  modules: {
    account
  }
})
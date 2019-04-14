import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'RegisterView',
      component: () => import(/* webpackChunkName: "about" */ './views/RegisterView.vue')
    },
    {
      path: '/signinview',
      name: 'SignInView',
      component: () => import(/* webpackChunkName: "about" */ './views/SignInView.vue')
    }
  ]
})

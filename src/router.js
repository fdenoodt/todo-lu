import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LoadingView',
      component: () => import('./views/LoadingView.vue')
    },
    {
      path: '/homeview',
      name: 'HomeView',
      component: () => import('./views/HomeView.vue')
    },
    {
      path: '/registerview',
      name: 'RegisterView',
      component: () => import('./views/RegisterView.vue')
    },
    {
      path: '/signinview',
      name: 'SignInView',
      component: () => import('./views/SignInView.vue')
    }
  ]
})

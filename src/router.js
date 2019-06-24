import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Settings from './views/Settings.vue'
import Editor from './components/Editor.vue'
import Leases from './components/Leases.vue'
import CloneExample from './components/CloneExample.vue'

import NestedExample from './components/NestedExample.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/leases',
      name: 'leases',
      component: Leases
    },
    {
      path: '/nested',
      name: 'nested',
      component: NestedExample
    },
    {
      path: '/cloneExample',
      name: 'cloneExample',
      component: CloneExample
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

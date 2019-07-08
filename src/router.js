import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Settings from './views/Settings.vue'
import Editor from './components/Editor.vue'
import Leases from './components/Leases.vue'
import Authenticate from './components/Authenticate.vue'
import CloneExample from './components/CloneExample.vue'
import Section from './components/Section.vue'

import NestedExample from './components/NestedExample.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',

  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { requiresAuth: true }
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
      meta: { requiresAuth: true }
    },
    {
      path: '/leases',
      name: 'leases',
      component: Leases,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/section/:id',
          name: 'section',
          component: Section
        }
      ]
    },
    {
      path: '/nested',
      name: 'nested',
      component: NestedExample,
      meta: { requiresAuth: true }
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/auth',
      name: 'auth',
      component: Authenticate
    }
  ]
})

router.beforeEach((to, from, next) => {
  // debugger
  let loggedIn = localStorage.getItem('user')
  if (loggedIn === 'null') {
    loggedIn = null
  }
  // loggedIn = !!loggedIn
  // loggedIn = !loggedIn

  const m = to.matched.some(r => r.meta.requiresAuth)
  if (m && !loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router

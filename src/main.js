import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGripLines,
  faEdit,
  faSave,
  faMinus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

// import storePlugin from './plugins/storePlugin'
// Vue.use(storePlugin)

library.add(faEdit)
library.add(faGripLines)
library.add(faSave)
library.add(faMinus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  router,
  store,
  created() {
    // Automatic login.
    var userString = localStorage.getItem('user')
    if (userString === 'null') {
      userString = null
    }
    // debugger
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      response => {
        console.log('successful intercept')
        return response
      },
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'
import EventServiceAlt from '../services/EventServiceAlt'
import axios from 'axios'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
    user: null,
    loggedIn: null,
    list: [],
    vxClone: null,
    inSingleMode: []
  },
  mutations: {
    SET_LIST(state, value) {
      state.list = value
    },
    SET_CLONE(state, value) {
      // debugger
      state.vxClone = value
    },
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`
    },
    LOGOUT() {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    storeList({ state, commit }, value) {
      commit('SET_LIST', value)
    },
    setNewClone({ state, commit }, value) {
      // debugger
      commit('SET_CLONE', value)
    },
    register({ commit }, user) {
      // debugger
      return EventServiceAlt.register(user).then(response => {
        console.log(JSON.stringify(response.data))
        commit('SET_USER_DATA', response)
      })
    },
    authenticateUser({ commit }, user) {
      // debugger
      return EventServiceAlt.authenticateUser(user).then(response => {
        // debugger
        commit('SET_USER_DATA', response)
      })
    },
    logout({ commit }) {
      commit('LOGOUT')
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  }
})

// EventServiceAlt.authenticateUser({
//   email: this.email,
//   password: this.password
// }).then(response => {
//   debugger
//   console.log(JSON.stringify(response.data))
//   console.log(response.data)
// })

// EventServiceAlt.register({

//       }).then(response => {
//         console.log(JSON.stringify(response.data))
//       })

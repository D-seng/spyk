import Vue from 'vue'
import Vuex from 'vuex'
import EventServiceAlt from '../services/EventServiceAlt'
import axios from 'axios'
import { state } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
    user: null,
    loggedIn: null,
    vxClone: null,
    vxClones: [],
    feeder: [],
    lease: []
  },
  mutations: {
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
    },
    UPDATE_LEASE(state, lse) {
      state.lease = lse
    },
    DELETE_CLONE(state) {
      state.vxClone = null
    },
    SET_LEASE(state, lse) {
      state.lease = lse
    },
    SET_FEEDER(state, fdr) {
      state.feeder = fdr
    },
    STOW_CLONE(state, itemAndSubsections) {
      state.vxClones.push(itemAndSubsections)
    },
    REMOVE_CLONES(state, id) {
      var result = state.vxClones.filter(item => item[0] === id)
    }
  },
  actions: {
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
    },
    updateLease({ commit }, lse) {
      commit('UPDATE_LEASE', lse)
    },
    setLease({ commit }, lse) {
      commit('SET_LEASE', lse)
    },
    setFeeder({ commit }, fdr) {
      commit('SET_FEEDER', fdr)
    },
    stowClone({ commit }, itemAndSubsections) {
      commit('STOW_CLONE', itemAndSubsections)
    },
    removeClone({ commit }, index) {
      commit('REMOVE_CLONE', index)
    },
    setClone({ state, commit }, value) {
      // debugger
      commit('SET_CLONE', value)
    },
    deleteClone({ state, commit }) {
      commit('DELETE_CLONE')
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

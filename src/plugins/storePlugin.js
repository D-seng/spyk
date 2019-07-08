import store from '../vuex/store'

export default {
  store,
  install(Vue, options) {
    Vue.prototype.$store = store
  }
}

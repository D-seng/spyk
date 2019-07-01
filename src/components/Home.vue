<template>
  <div>
    <div v-if="!loggedIn">
      <h3>
        Please <router-link to="/auth"> log in </router-link> or
        <router-link to="/register"> register.</router-link>
      </h3>
    </div>
    <!-- <Popup /> -->
  </div>
</template>

<script type="module">
import Popup from './Popup'
import { authComputed } from '@/vuex/helpers.js'
export default {
  components: {
    Popup
  },
  methods: {
    // show() {
    //   this.$modal.show('hello-world')
    // },
    // hide() {
    //   this.$modal.hide('hello-world')
    // }
  },
  computed: {
    ...authComputed
  },
  beforeCreate() {
    // fetch('http://localhost:3000' + '/api/snippet', {
    //   method: 'GET'
    // }).then(res => {
    //   // console.log(res)
    //   console.log(res.json())
    // })
  }
}
</script>

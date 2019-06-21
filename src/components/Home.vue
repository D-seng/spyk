<template>
  <div>
    <p>home</p>
    <Popup />
  </div>
</template>

<script type="module">
import Popup from './Popup'
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

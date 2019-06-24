<template>
  <div>
    <h3>Register</h3>
    <v-btn @click="registerUser">registerUser</v-btn>
  </div>
</template>

<script type="module">
import EventServiceAlt from '@/services/EventServiceAlt'
export default {
  data() {
    return {}
  },
  methods: {
    registerUser() {
      EventServiceAlt.register().then(response => {
        console.log(JSON.stringify(response.data))
      })
      // debugger
    }
  }
}
</script>

<style lang="scss" scoped></style>

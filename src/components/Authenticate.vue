<template>
  <div>
    <h3>Register</h3>
    <v-btn @click="authUser">authenticateUser</v-btn>
  </div>
</template>

<script type="module">
import EventServiceAlt from '@/services/EventServiceAlt'

export default {
  data() {
    return {
      username: 'jacksikma',
      first: 'Jack',
      last: 'Sikma',
      email: 'jack@soni.com',
      password: '1234567'
    }
  },
  methods: {
    authUser() {
      debugger
      EventServiceAlt.authenticateUser({
        username: this.username,
        first: this.first,
        last: this.last,
        email: this.email,
        password: this.password
      }).then(response => {
        console.log(JSON.stringify(response.data))
      })
      // debugger
    }
  }
}
</script>

<style lang="scss" scoped></style>

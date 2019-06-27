<template>
  <div>
    <h3>Register</h3>
    <v-btn @click="registerUser">registerUser</v-btn>
  </div>
</template>

<script type="module">
import EventServiceAlt from '@/services/EventServiceAlt'
import bcryptjs from 'bcryptjs'
export default {
  data() {
    return {
      username: 'jacksikma',
      first: 'Jack',
      last: 'Sikma',
      email: 'jack@supersonic.com',
      password: '123456'
    }
  },
  methods: {
    async hash() {
      const salt = await bcryptjs.genSalt(10)
      debugger
      console.log(salt)
    },
    registerUser() {
      debugger
      this.hash()
      EventServiceAlt.register({
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

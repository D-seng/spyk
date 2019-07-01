<template>
  <div>
    <form @submit.prevent="registerUser">
      <label for="username">
        Username:
      </label>
      <input v-model="username" type="text" name="username" value />

      <label for="first">
        First:
      </label>
      <input v-model="first" type="text" name="first" value />

      <label for="last">
        Last:
      </label>
      <input v-model="last" type="text" name="last" value />

      <label for="email">
        Email:
      </label>
      <input v-model="email" type="email" name="email" value />

      <label for="password">
        Password:
      </label>
      <input
        v-model="password"
        type="password"
        name="password"
        autocomplete=""
        value
      />

      <button type="submit" name="button">
        Register
      </button>
      <h3>Already have an account?</h3>
      <router-link tag="h3" to="/auth"><a>Log In</a></router-link>
    </form>
  </div>
</template>

<script type="module">
import EventServiceAlt from '@/services/EventServiceAlt'

export default {
  data() {
    return {
      username: '',
      first: '',
      last: '',
      email: '',
      password: ''
    }
  },
  methods: {
    registerUser() {
      this.$store
        .dispatch('register', {
          username: this.username,
          first: this.first,
          last: this.last,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'nested' })
        })

      // debugger
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
</style>

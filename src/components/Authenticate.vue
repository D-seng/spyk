<template>
  <div>
    <form @submit.prevent="authUser">
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
        Log In
      </button>
      <p>{{ error }}</p>
      <h3>
        Not registered?
      </h3>
      <router-link tag="h3" to="/register"><a>Sign Up!</a></router-link>
    </form>
  </div>
</template>

<script type="module">
export default {
  data() {
    return {
      email: null,
      password: null,
      error: null
    }
  },

  methods: {
    authUser() {
      // debugger
      this.$store
        .dispatch('authenticateUser', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'nested' })
        })
        .catch(err => {
          console.log(err.response.data)

          this.error = err.response.data
        })
      // debugger
    }
  }
}
</script>

<style lang="scss" scoped></style>

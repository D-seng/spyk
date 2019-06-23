<template>
  <v-app class>
    <NavBar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script type="module">
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {}
  }
}
</script>

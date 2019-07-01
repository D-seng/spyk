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
<style lang="scss">
@import './assets/styles/global.scss';
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 56px);
}
</style>

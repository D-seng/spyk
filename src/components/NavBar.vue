<template>
  <nav>
    <v-toolbar app flat class="grey lighten-4">
      <div v-if="loggedIn">
        <v-toolbar-side-icon
          class="grey--text"
          @click="drawer = !drawer"
        ></v-toolbar-side-icon>
      </div>
      <v-toolbar-title class="headline text-lowercase">
        <span class="font-weight-light text-uppercase">AUD</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="loggedIn">
        <v-btn>SIGN OUT</v-btn>
      </div>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-tile
          v-for="link in links"
          :key="link.title"
          class="ma-1"
          router
          :to="link.route"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content class="grey--text darken-4">
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { authComputed } from '@/vuex/helpers.js'
export default {
  data() {
    return {
      drawer: false,
      links: [
        { title: 'Leases', icon: 'folder', route: '/leases' },
        { title: 'Home', icon: 'home', route: '/' },
        { title: 'Settings', icon: 'settings', route: '/settings' },
        { title: 'Editor', icon: 'info', route: '/editor' },
        { title: 'Nested', icon: 'info', route: '/nested' },
        { title: 'Register', icon: 'info', route: '/register' },
        { title: 'Log In', icon: 'info', route: '/auth' }
      ]
    }
  },
  computed: {
    ...authComputed
  }
}
</script>

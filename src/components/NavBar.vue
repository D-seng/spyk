<template>
  <nav>
    <v-toolbar app flat class="grey lighten-4">
      <v-toolbar-side-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-lowercase">
        <span>li</span>
        <span class="font-weight-light text-uppercase">SMART</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn flat color="grey">SIGN OUT</v-btn>
      <v-icon>exit_to_app</v-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-tile
          class="ma-1"
          v-for="link in links"
          :key="link.title"
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
export default {
  data() {
    return {
      drawer: false,
      links: [
        { title: 'Leases', icon: 'folder', route: '/leases' },
        { title: 'Home', icon: 'home', route: '/' },
        { title: 'Settings', icon: 'settings', route: '/settings' },
        { title: 'Editor', icon: 'info', route: '/editor' },
        { title: 'Nested', icon: 'info', route: '/nested' }
      ]
    }
  }
}
</script>

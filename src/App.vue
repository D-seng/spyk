<template>
  <div>
    <div v-if="showBackdrop" class="backdrop" @click="hideModal"></div>

    <v-app>
      <NavBar />
      <v-content>
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script type="module">
import NavBar from './components/NavBar'
import { eventBus } from '@/main.js'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      showBackdrop: false
    }
  },
  created() {
    eventBus.$on('showEditor', () => {
      this.showBackdrop = true
    }),
      eventBus.$on('hideEditor', () => {
        this.showBackdrop = false
      })
  },
  methods: {
    hideModal() {}
  }
}
</script>
<style lang="scss">
@import './assets/styles/global.scss';
// .page {
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   min-height: calc(100vh - 56px);
// }
.backdrop {
  position: fixed;
  // display: none;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

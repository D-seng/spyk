<template>
  <div v-if="activation">
    <v-dialog max-width="600px" slot="activator">
      <!-- <v-btn slot="activator">try an icon</v-btn> -->
      <!-- Remove button from here //Emit an event from list when edit icon is -->
      <v-card>
        <!-- <Editor /> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script type="module">
// import Editor from '../views/Editor.vue'
export default {
  props: {
    activation: null
  },
  components: {
    // Editor
  }
}
</script>

<style scoped></style>

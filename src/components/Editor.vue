<template>
  <div class="editor-layout">
    <div class="editor-heading">
      <h3>Editing Section {{ section }}...</h3>
    </div>
    <VueEditor
      v-model="content.text"
      class="vue-editor-form"
      :editor-toolbar="customToolbar"
    >
    </VueEditor>
    <div>
      <button class="button" @click="closeModal">Cancel</button>
      <button class="button" @click="onSubmit">Submit</button>
    </div>
    <div>
      <ul class="hidden-info">
        <li class="blue">{{ verbiage }}</li>
        <li>{{ elId }}</li>
      </ul>
    </div>

    <!-- <v-btn @click="onSubmit">Submit</v-btn> -->
  </div>
</template>

<script type="module">
import { VueEditor } from 'vue2-editor'
import { eventBus } from '@/main.js'

export default {
  components: {
    VueEditor
  },
  props: {
    section: String,
    verbiage: String,
    elId: String
  },
  data() {
    return {
      editorKey: 0,
      sec: this.section,
      content: {
        text: this.verbiage,
        elId: this.elId,
        section: this.section
      },
      customToolbar: [
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    }
  },
  methods: {
    closeModal() {
      eventBus.$emit('hideEditor')
    },
    onSubmitA() {
      alert('onSubmitA')
    },
    onSubmit() {
      // var jwtK = process.env.VUE_APP_JWTKEY
      console.log('jwtKey')
      console.log(process.env.VUE_APP_SECRET)
      // debugger
      eventBus.$emit('sync-content', this.content)
      // this.$emit('sync-content', this.content.text)
    },
    processenv() {
      console.log(process.env.VUE_APP_DBUSER)
      console.log(process.env.VUE_APP_DBPASSWORD)
      console.log(process.env.VUE_APP_DBPASSWORDATLAS)
    },
    post() {
      var submittal = JSON.stringify(this.content)
      console.log(submittal)
    },
    postX() {
      console.log(this.content)
    },
    put() {}
  }
}
</script>
<style scoped>
.editor-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vue-editor-form {
  width: 100%;
}

.editor-heading {
  align-self: flex-start;
  margin: 0.5rem 0;
}
.hidden-info {
  display: none;
}
</style>

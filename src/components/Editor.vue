<template>
  <div>
    <!-- <font-awesome-icon
      icon="grip-lines"
      class="fas fa-grip-lines fa-lg handle"
      @click="edit"
    /> -->
    <h3>{{ section }}{{ verbiage }} {{ elId }}</h3>
    <input type="" />

    <!-- @submit.prevent="onSubmitA" @click.shift="testKeyPresses" -->
    <form>
      <VueEditor
        v-model="content.text"
        :editor-toolbar="customToolbar"
      ></VueEditor>

      <button @click="closeModal">Cancel</button>
      <button @click="onSubmit">Submit</button>
    </form>

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
      // console.log(JSON.stringify(this.list, null, 2))

      //create new db called 'lx' use new Acosta dev-server
      var submittal = JSON.stringify(this.content)
      console.log(submittal)
      // fetch('http://localhost:3000' + '/api/user', {
      //   method: 'POST'
      // }).then(res => {
      //   // console.log(res)
      //   console.log(res.json())
      // })

      // EventServiceAlt.postSnippet({
      //   text: submittal,
      //   text2: submittal + 'adsfasfd'
      // }).then(response => {
      //   console.log(response.status)
      // })
      // axios({
      //   method: 'post',
      //   data: {
      //     text: submittal
      //   },
      //   url: 'http://localhost:3000/snippets',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(() => {
      //   console.log('ss')
      // })

      // console.log(this.content)
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5000/api/posts',
      //   data: this.content
      // })
    },
    postX() {
      console.log(this.content)
    },
    put() {}
  }
}
</script>
<style scoped>
.editorBtn {
  display: inline;
}
</style>

<template>
  <div class="about">
    <!-- <font-awesome-icon
      icon="grip-lines"
      class="fas fa-grip-lines fa-lg handle"
      @click="edit"
    /> -->
    <h3>{{ section }}{{ verbiage }} {{ elId }}</h3>
    <input type="" />
    <form @submit.prevent="onSubmit" @click.shift="testKeyPresses">
      <VueEditor
        v-model="content.text"
        :editor-toolbar="customToolbar"
      ></VueEditor>
      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>

    <!-- <v-btn @click="onSubmit">Submit</v-btn> -->
  </div>
</template>

<script type="module">
import { VueEditor } from 'vue2-editor'

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
        text: this.verbiage
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
    onSubmit() {
      this.$emit('sync-content', this.content.text)
    },
    testKeyPresses() {
      // console.log(this.content.text)
      this.$emit('sync-content', this.content.text)
      // var el = document.getElementById(this.elId)
      // el.innerHTML = this.content.text
    },
    processenv() {
      console.log(process.env.VUE_APP_DBUSER)
      console.log(process.env.VUE_APP_DBPASSWORD)
      console.log(process.env.VUE_APP_DBPASSWORDATLAS)
    },
    post() {
      // console.log(JSON.stringify(this.list, null, 2))

      //create new db called 'lx' use new Acosta dev-server
      var submittal = JSON.stringify(this.content.text)
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

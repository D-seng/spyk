<template>
  <div class="simplebox">
    <div>
      <p :id="'sec-' + el.id">
        <span
          ><font-awesome-icon
            icon="edit"
            class="fas fa-edit fa-lg il"
            @click="
              showEditor({
                id: el.id,
                elId: el.id,
                content: el.verbiage,
                section: el.section
              })
            "/></span
        >{{ el.section }}
      </p>
      <p
        :id="el.id"
        contenteditable="true"
        @input="showSaveIcon(el.id)"
        v-html="el.verbiage"
      ></p>
    </div>
  </div>
</template>

<script type="module">
import { eventBus } from '@/main.js'
// import { type } from 'os'

export default {
  name: 'LineItem',

  // @click="editX(el.section, el.verbiage, el.id)"
  components: {},
  props: {
    el: {
      required: true,
      type: Object
    }
  },
  methods: {
    showEditor(editorData) {
      // editorData.showDialog = !editorData.showDialog
      // debugger
      // this.$route.name = 'edit'
      eventBus.$emit('showEditor', editorData)
    }
  }
}
</script>
<style>
.simplebox {
  border: solid seagreen 1px;
}
</style>

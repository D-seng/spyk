<template>
  <div class="card">
    <div class="top-of-card">
      <p :id="'sec-' + el.id">
        <span
          ><font-awesome-icon
            icon="edit"
            class="fas fa-edit fa-lg il edit-icon"
            @click="
              showEditor({
                id: el.id,
                elId: el.id,
                content: el.verbiage,
                section: el.section
              })
            "
        /></span>

        {{ el.section }}
        <span :class="[isSaveActive ? 'active' : 'inactive']"
          ><font-awesome-icon
            icon="save"
            class="fas fa-save fa-lg il"
            @click="save"
        /></span>
      </p>
    </div>
    <div class="bottom-of-card"> 
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
  data() {
    return {
      isSaveActive: ''
    }
  },
  methods: {
    showSaveIcon(elId) {
      this.isSaveActive = true
    },
    save() {},
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
.card {
  background: var(--color-4-t);
  display: flex;
  flex-direction: row;
  border: 1.5px solid var(--color-4);
  border-radius: 15px;
  
}

.top-of-card{
  background-color: var(--color-h);
  padding: 0.5rem;
  border-radius: 15px 0 0 15px;
}

.bottom-of-card {

}
.inactive {
  display: none;
}
.edit-icon:hover {
  cursor: pointer;
}
.active {
  display: inline;
}
</style>

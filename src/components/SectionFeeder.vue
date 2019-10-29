<template>
  <div class="card">
    <div class="top-of-card">
      <p :id="'sec-' + el.id">
        <span
          ><font-awesome-icon
            :id="'faminus-' + el.id"
            icon="minus"
            class="fas fa-minus "
            @click="fold(el)"
        /></span>

        {{ el.section }}
      </p>
    </div>
    <div class="bottom-of-card">
      <p :id="el.id" v-html="el.verbiage"></p>
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
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.top-of-card {
  background-color: var(--color-h);
  padding: 0.5rem;
  border-radius: 15px 0 0 15px;
  width: 8rem;
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

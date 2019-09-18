<template>
  <div>
    <!-- <div :disabled="isEditorOpen"> -->
    <div v-if="showModal" class="editor">
      <Editor
        :key="editorKey"
        :section="editorData.section.toString()"
        :verbiage="editorData.content"
        :el-id="editorData.elId"
      ></Editor>
      <router-view />
    </div>

    <div class="page-grid">
      <!-- <p>{{ list }}</p> -->
      <div class="feeder">
        <RetrieveFeeders @get-feeders="getFeeders"></RetrieveFeeders>
        <h4>{{ intent }}</h4>
        <NestedDraggableFeeder
          :list1="feeder"
          @show-editor="edit"
          @force-renumber="forceRenumber"
        />
      </div>
      <div class="leases">
        <RetrieveLeases @get-lease="getLease"></RetrieveLeases>
        <v-btn @click="undo">Undo</v-btn>
        <v-btn @click="redo">Redo</v-btn>

        <div id="top">
          <NestedDraggable
            :key="listKey"
            :list="lease"
            :ce="true"
            :counter="counter"
            @renumber-handler="renumber(lease)"
            @add-to-stack="addToStack"
            @show-editor="edit"
            @update-lse="updateLse"
            @find-landing="findLanding"
          />
        </div>
      </div>

      <div class="testbtns">
        <v-btn @click="put">put</v-btn>
        <v-btn @click="post">post</v-btn>
        <v-btn @click="genId">genId</v-btn>
        <v-btn @click="getClause">getClause</v-btn>
        <v-btn @click="put">put</v-btn>
        <!-- <p v-else>showDialog is false</p> -->
      </div>
      <!-- <rawDisplayer class="col-0" :value="list" title="List" /> -->
    </div>
  </div>
</template>

<script type="module">
import NestedDraggable from '@/components/NestedDraggable'
import NestedDraggableFeeder from '@/components/NestedDraggableFeeder'
import EventServiceAlt from '@/services/EventServiceAlt.js'
import DbArrayServices from '@/services/DbArrayServices.js'
import cloneDeep from 'lodash.clonedeep'
import Editor from './Editor.vue'
import RetrieveLeases from './RetrieveLeases.vue'
import RetrieveFeeders from './RetrieveFeeders.vue'
import ReorderService from '@/services/ReorderService'
import Mongoose from 'mongoose'
import { eventBus } from '@/main.js'

export default {
  name: 'NestedExample',
  display: 'Nested',

  components: {
    NestedDraggable,
    NestedDraggableFeeder,
    Editor,
    RetrieveLeases,
    RetrieveFeeders
  },
  data() {
    return {
      intent: '',
      stepper: [],
      stepIndex: -1,
      id: null,
      idFeeder: null,
      editorKey: 0,
      listKey: 0,
      elId: '',
      showEditor: false,
      newContent: null,
      evt: null,
      counter: '1a',

      editorData: {
        id: null,
        elId: null,
        content: null,
        section: null
        // showDialog: false
      }
    }
  },
  computed: {
    feeder() {
      return this.$store.state.feeder
    },
    lease() {
      return this.$store.state.lease
    },
    showModal() {
      // debugger
      // console.log(this.$route.name)
      return this.showEditor
    }
  },
  created() {
    eventBus.$on('showEditor', editorData => {
      // alert('I heard the click.')
      // this.$route.name = 'edit'
      // debugger
      this.showEditor = true
      this.editorData = editorData
      this.editorKey += 1
    }),
      eventBus.$on('', () => {
        this.showEditor = false
        // this.editorData = editorData
        // this.editorKey += 1
      }),
      eventBus.$on('sync-content', newContent => {
        debugger
        this.resetLease(newContent)
      }),
      eventBus.$on('hideEditor', () => {
        this.hideEditor()
      }),
      eventBus.$on('showSaveIcon', () => {})
  },
  methods: {
    save(elId) {},
    resetLease(newContent) {
      let lease = this.$store.state.lease
      let pos = ReorderService.schArr(lease, newContent.elId)
      //debugger
      var t = lease[0].subsections[0]
      let el = eval(pos)
      //debugger

      el.verbiage = newContent.text
      //el.verbiage = 'uuu'
      debugger
      this.$store.dispatch('updateLease', lease)
      console.log(lease)
      this.$store.dispatch('setLease', lease)
      debugger
      //this.editorKey += 1
      this.listKey += 1
      //this.hideEditor()
      eventBus.$emit('hideEditor')
    },
    genId() {
      var objectId = new Mongoose.Types.ObjectId()
      console.log(objectId)
    },
    findLanding(evt) {
      ReorderService.findLanding(evt, this.lease)
    },
    getLease(id) {
      EventServiceAlt.getSnippet(id).then(response => {
        this.id = response.data._id
        var lease = response.data.text
        // debugger
        lease = DbArrayServices.createNested(lease)
        // console.log(JSON.stringify(response.data.text, null, 2))
        // debugger
        console.log(lease)
        this.addToStack()
        ReorderService.renumber(lease)
        this.$store.dispatch('setLease', lease)
        this.editorKey += 1
        this.listKey += 1
      })
    },
    // EVENTUALLY, MOVE ALL OF THE LEASE AND FEEDER INTO VUEX STORE.
    getFeeders(id) {
      EventServiceAlt.getFeeder(id).then(response => {
        this.idFeeder = response.data._id
        // debugger

        var feeder = response.data.text
        this.intent = response.data.intent
        ReorderService.renumber(feeder)
        this.$store.dispatch('setFeeder', feeder)
        // this.activateAllElements(this.feeder)
        // this.$store.commit('SET_LIST', this.feeder)
      })
    },
    getClause() {
      // 5cb278977b039e5714dcd661
      // 4f88a420-5825-11e9-8565-ad52d0bb74d6
      // debugger
      EventServiceAlt.getClause('5cb278977b039e5714dcd661').then(response => {
        console.log(response.data)
      })
    },
    addUniqueIds(list) {
      list.forEach(item => {
        console.log(item)
      })
    },
    updateLse(id, newContent) {
      alert(newContent)
      this.newContent = newContent
      this.elId = id
      ReorderService.schArr(this.lease, this.elId)
    },

    edit(id, verbiage, elId) {
      // this.showDialog = true
      // this.section = id
      // this.elId = elId
      // this.content = verbiage
      this.editorKey += 1
    },

    post() {
      debugger
      var lseTxt = DbArrayServices.flatten(this.lease)
      var lse = {
        tenant: 'tst tenant',
        landlord: '65th & Broadway, L.P',
        property: '65th Building',
        text: lseTxt
      }
      debugger
      EventServiceAlt.postSnippet(lse).then(response => {
        console.log(response.data)
      })
    },
    put() {
      debugger
      EventServiceAlt.putSnippet(this.lease, this.id).then(response => {
        console.log(response.data)
      })
    },
    getId() {
      debugger
      EventServiceAlt.getClause('aa').then(response => {
        console.log(response)
      })
    },

    copy(o) {
      var output
      var v
      var key
      output = Array.isArray(o) ? [] : {}
      for (key in o) {
        v = o[key]
        output[key] = typeof v === 'object' ? this.copy(v) : v
      }
      return output
    },
    addToStack() {
      // debugger
      this.stepIndex += 1
      this.stepper.splice(this.stepIndex, 1, cloneDeep(this.lease))
      console.log(this.stepper[this.stepIndex])
    },
    undo() {
      console.log(this.stepIndex)
      if (this.stepIndex >= 1) {
        // this.stepForward.push(this.copy(this.lease))
        this.lease = cloneDeep(this.stepper[this.stepIndex - 1])
        console.log(this.stepper[this.stepIndex])
        this.stepIndex -= 1
      }
    },
    redo() {
      console.log('stepIndex: ' + this.stepIndex)
      console.log('stepper length: ' + this.stepper.length)

      if (this.stepper.length >= 0) {
        if (this.stepIndex < this.stepper.length - 1) {
          console.log('aaaa')
          this.lease = cloneDeep(this.stepper[this.stepIndex + 1])

          this.stepIndex += 1
        }
      }
    },
    hideEditor() {
      this.showEditor = false
    },
    forceRenumber() {
      // alert('forceRenumb')

      console.log('this.feeder')
      console.log(this.feeder)
      debugger
      ReorderService.renumberX(this.$store.state.list)
    },

    activateAllElements(arr) {
      arr.forEach(function(item) {
        item.active = true
      })
    }
  }
}
</script>
<style scoped>
.save-icon {
  display: none;
}
.selected {
  background-color: rgba(180, 100, 100, 0.808);
}
.modal {
  background-color: aquamarine;
}
.disable:disabled {
  background-color: #ccc;
}
.page-grid {
  display: grid;
  grid-template-areas:
    'feeder lease'
    'editor testbtns';
  grid-gap: 2rem;
}
.feeder {
  grid-area: feeder;
}
.lease {
  grid-area: lease;
}
.editor {
  position: fixed;
  z-index: 2;
  top: 20%;
  left: 2%;
  width: 50%;
  background: white;
  padding: 1rem;
  border: 1px #ccc;
  box-shadow: 1px rgba(100, 100, 100, 0.808);
}

.testbtns {
  grid-area: testbtns;
}
</style>

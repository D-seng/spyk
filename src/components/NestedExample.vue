<template>
  <div>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs6>
          <!-- <p>{{ list }}</p> -->
          <RetrieveFeeders @get-feeders="getFeeders"></RetrieveFeeders>
          <h4>{{ intent }}</h4>
          <NestedDraggableFeeder
            :list1="feeder"
            @show-editor="edit"
            @force-renumber="forceRenumber"
          />
        </v-flex>
        <v-flex xs6 :key="listKey" id="top">
          <RetrieveLeases @get-lease="getLease"></RetrieveLeases>
          <v-btn @click="undo">Undo</v-btn>
          <v-btn @click="redo">Redo</v-btn>
          <div id="top">
            <NestedDraggable
              :list="lease"
              @renumber-handler="renumberX(lease)"
              @add-to-stack="addToStack"
              :ce="true"
              @show-editor="edit"
              @update-lse="updateLse"
              @find-landing="findLanding"
              :counter="this.counter"
            />
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn @click="stringify">stringify</v-btn> -->
    <v-btn @click="put">put</v-btn>
    <v-btn @click="post">post</v-btn>

    <p v-if="showDialog">
      showDialog is true
      <Editor
        :section="this.section.toString()"
        :verbiage="this.content"
        :elId="this.elId"
        :key="editorKey"
        @sync-content="syncContent"
        :newContent="content.text"
      ></Editor>
    </p>
    <p v-else>showDialog is false</p>

    <!-- <rawDisplayer class="col-0" :value="list" title="List" /> -->
  </div>
</template>

<script type="module">
import NestedDraggable from '@/components/NestedDraggable'
import NestedDraggableFeeder from '@/components/NestedDraggableFeeder'
import EventServiceAlt from '@/services/EventServiceAlt.js'
import cloneDeep from 'lodash.clonedeep'
import Editor from './Editor.vue'
import RetrieveLeases from './RetrieveLeases.vue'
import RetrieveFeeders from './RetrieveFeeders.vue'
const uuidv4 = require('uuid/v4')

var k = 0
export default {
  name: 'nested-example',
  display: 'Nested',
  order: 19,

  components: {
    NestedDraggable,
    NestedDraggableFeeder,
    Editor,
    RetrieveLeases,
    RetrieveFeeders
  },
  data() {
    return {
      feeder: [],
      intent: '',
      lease: [],
      stepper: [],
      stepIndex: -1,
      id: null,
      idFeeder: null,
      showDialog: false,
      section: null,
      content: null,
      editorKey: 0,
      listKey: 0,
      elId: '',
      lev: null,
      newContent: '',
      cloneText: [],
      arrChildren: [],
      start: 'start',
      evt: null,
      insertAfter: false,
      counter: '1a',
      saveWithIds: false
    }
  },
  computed: {
    bFeeder() {
      return this.feeder
    }
  },
  methods: {
    // singleElement(ev) {
    //   // debugger
    //   this.singleMode = !this.singleMode

    //   //change class to show selection
    // },
    assignSection(sec, mode, evt) {
      //
      var pos
      var lastBracket
      var arrSec = []
      var k
      var newObj

      if (this.$store.state.vxClone) {
        newObj = this.$store.state.vxClone
      } else {
        // Use LI searcher here
        var evtItemSec = evt.item.children[0].children[0].children[0].innerText
        if (evtItemSec.indexOf('.') === -1) {
          pos = this.feeder[evtItemSec]
        } else {
          k = 0
          arrSec = evtItemSec.split('.')
          pos = 'this.feeder[' + arrSec[0] + ']'
          for (k = 1; k < arrSec.length; k++) {
            pos = pos + '.subsections[' + arrSec[k] + ']'
          }
        }
        // debugger
        var fObj = eval(pos)

        newObj = {
          id: fObj.id,
          section: fObj.section,
          verbiage: fObj.verbiage,
          subsections: fObj.subsections
        }
        // TO MAKE THIS WORK, NEED TO RENUMBER LEASE
        // WHEN IT'S INITIALLY RENDERED, TO MAKE SURE THE SECTIONS
        // ARE CORRECT. DON'T RELY ON THE SECTIONS IN THE DB.
      }
      if (mode === 'root') {
        this.lease.splice(sec, 0, newObj)
      } else {
        arrSec = sec.split('.')
        k = 0
        // debugger
        pos = 'this.lease[' + arrSec[0] + ']'
        for (k = 0; k < arrSec.length; k++) {
          pos = pos + '.subsections[' + arrSec[k] + ']'
        }
        //Get last occurrence of '['.
        // Lop it and the remaindr of the string off.
        lastBracket = pos.lastIndexOf('[')
        var posTrunc = pos.substring(0, lastBracket)

        switch (mode) {
          case 'notFirst':
            if (this.insertAfter) {
              eval(posTrunc + '.splice(arrSec[k - 1],0, newObj)')
              this.insertAfter = false
            } else {
              eval(posTrunc + '.splice(arrSec[k - 1] - 1,0, newObj)')
            }
            break
          case 'firstOfMany':
            // eval(pos + '.splice(arrSec[k - 1],0, newObj)')
            eval(posTrunc + '.unshift(newObj)')
            // console.log(eval(posTrunc + '.splice(arrSec[k - 1] - 1,0, newObj)'))
            break
          case 'firstOfOne':
            // eval(pos + '.splice(arrSec[k - 1] - 1,0, newObj)')
            // console.log(this.lease[2].subsections[0].subsections[0])
            console.log(this.lease[1].subsections[0].subsections[0])
            console.log(eval(pos))

            eval(pos + '.subsections[0] = newObj')
        }
      }
      pos = null
      // console.log(this.lease)
    },
    findLanding(evt) {
      // debugger
      var subsectionEl
      var sec
      var mode
      // debugger

      console.log(this.$store.state.vxClone)
      console.log('evt.to.parentNode')
      console.log(evt.to.parentNode)
      // debugger
      // console.log('evt.to.children[0].children[0].children[0].innerText')
      // console.log(evt.to.children[0].children[0].children[0].innerText)
      // debugger

      if (evt.to.parentNode.parentNode.parentNode.id === 'top') {
        sec = evt.newIndex
        mode = 'root'
      } else {
        subsectionEl = evt.to

        do {
          subsectionEl = subsectionEl.parentNode
        } while (subsectionEl.nodeName != 'LI')

        if (evt.newIndex === 0) {
          if (evt.to.children.length === 0) {
            mode = 'firstOfOne'

            // subsectionEl =
            //   evt.to.parentNode.parentNode.parentNode.children[0].children[0]
            //     .children[evt.newIndex]
            sec = subsectionEl.children[0].children[0].children[0].innerText
          } else {
            mode = 'firstOfMany'
            sec = subsectionEl.children[0].children[0].children[0].innerText
          }
        } else {
          mode = 'notFirst'
          // if (evt.to.children[evt.newIndex]) {
          //   sec = subsectionEl.children[0].children[0].children[0].innerText
          // } else {
          subsectionEl = evt.to.children[evt.newIndex - 1]
          sec = subsectionEl.children[0].children[0].children[0].innerText
          this.insertAfter = true
          // }
        }
      }
      // debugger
      // sec = '0.1'
      this.assignSection(sec, mode, evt)
      this.renumberX(this.lease)
    },
    getLease(id) {
      EventServiceAlt.getSnippet(id).then(response => {
        this.id = response.data._id
        this.lease = response.data.text
        console.log(JSON.stringify(response.data))

        this.addToStack()
        this.renumberX(this.lease)
      })
      // debugger
    },
    getFeeders(id) {
      // debugger
      EventServiceAlt.getFeeder(id).then(response => {
        this.idFeeder = response.data._id

        this.feeder = response.data.verbiage
        this.intent = response.data.intent
        console.log(this.intent)
        console.log(JSON.stringify(response.data.verbiage))
        this.renumberX(this.feeder, false)
        // debugger
        // this.activateAllElements(this.feeder)

        this.$store.commit('SET_LIST', this.feeder)

        // this.renumberX(this.feeder)
      })
    },
    addUniqueIds(list) {
      list.forEach(item => {
        console.log(item)
      })
      debugger
    },
    updateLse(id, newContent) {
      alert(newContent)
      this.newContent = newContent
      this.elId = id
      this.schArr(this.lease, this.elId)
    },
    syncContent(newCont) {
      this.newContent = newCont
      this.schArr(this.lease, this.elId)
    },
    schArr(arr, elId) {
      // debugger
      var pos
      console.log(elId)
      var result = arr.filter(item => item.id === elId)
      if (result.length === 0) {
        var ss = arr.filter(item => item.subsections.length > 0)
        if (ss.length > 0) {
          for (var i = 0; i < ss.length; i++) {
            this.schArr(ss[i].subsections, elId)
          }
        }
      } else {
        var sec = result[0].section.toString()
        console.log(sec)
        if (sec.length > 1) {
          var arrSec = sec.split('.')
          pos = 'this.lease[' + arrSec[0] + ']'
          for (k = 1; k < arrSec.length; k++) {
            pos = pos + '.subsections[' + (arrSec[k] - 1) + ']'
          }
        } else {
          pos = 'this.lease[' + sec + ']'
        }
        // console.log(pos)

        var el = eval(pos)
        console.log(el)

        el.verbiage = this.newContent

        console.log(el)
      }
    },
    edit(id, verbiage, elId) {
      this.showDialog = true
      this.section = id
      this.elId = elId
      this.content = verbiage
      this.editorKey += 1
    },

    stringify() {
      // console.log(JSON.stringify(this.feeder, null, 2))
      // console.log(JSON.stringify(this.lease, null, 2))
    },

    post() {
      console.log(JSON.stringify(this.bLease))
    },
    put() {
      EventServiceAlt.putSnippet(this.lease, this.id).then(response => {
        console.log(response.data)
        //   console.log(response.status)
        //   console.log(response.statusText)
        //   console.log(response.headers)
        //   console.log(response.config)
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
      // debugger

      if (this.stepper.length >= 0) {
        if (this.stepIndex < this.stepper.length - 1) {
          console.log('aaaa')
          this.lease = cloneDeep(this.stepper[this.stepIndex + 1])

          this.stepIndex += 1
        }
      }
    },
    forceRenumber() {
      // alert('forceRenumb')

      console.log('this.feeder')
      console.log(this.feeder)
      this.renumberX(this.$store.state.list)
    },

    activateAllElements(arr) {
      arr.forEach(function(item) {
        item.active = true
      })
    },
    renumberX(arrToReorder) {
      // alert('renumberX')
      // debugger
      var subsequent = false
      var prefix = ''
      this.renumber(arrToReorder, subsequent, prefix)
      this.editorKey += 1
      this.listKey += 1
    },

    renumber(arrToReorder, subsequent, prefix) {
      // debugger
      var arrNextLevel = []
      //  ADD UNIQUE IDS HERE.
      // CHECK EACH EXISTING ID AND SEE IF IT'S A 128-BIT UUID

      // var elId = this.genUUID()
      // debugger
      let swid
      var newId

      // console.log(typeof a)

      // var result = 'sss'.match(patt)
      var patt = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      arrToReorder.forEach(function(item) {
        // debugger
        // if (hide) {
        //   item.hidden = true
        // }
        if (item.id.toString().match(patt) === null) {
          newId = uuidv4()
          item.id = newId
          swid = true
        }

        if (subsequent === false) {
          item.section = arrToReorder.indexOf(item)
        } else {
          item.section = prefix + '' + (arrToReorder.indexOf(item) + 1) + ''
        }

        if (item.subsections.length > 0) {
          arrNextLevel.push([item.section, item.subsections])
        }
      })
      var arrNextLevelCopy = Array.from(arrNextLevel)
      subsequent = true

      for (var i = 0; i < arrNextLevelCopy.length; i++) {
        prefix = arrNextLevel[i][0] + '.'
        // alert(prefix)
        this.renumber(arrNextLevelCopy[i][1], subsequent, prefix)
      }

      this.reorder = arrToReorder
      this.saveWithIds = swid
    }
  },
  beforeCreate() {
    // console.log('beforeCreate')
    // fetch('http://localhost:3000' + '/api/user', {
    //   method: 'GET'
    // }).then(res => {
    //   // console.log(res)
    //   console.log(res.json())
    // })
  },

  created() {
    console.log('created-cc')
    // EventServiceAlt.getSnippet('5caf4c508ab4406e4bf34de3').then(response => {
    //   // console.log('resp.text')
    //   // console.log(typeof response.data.text)
    //   // console.log(response.data.text)
    //   this.id = response.data._id
    //   this.lease = response.data.text
    //   // console.log(JSON.stringify(response.data))
    //   // console.log('created')
    // this.addToStack()
    // })
    // EventService.getTodo('5c8525bda12257857384470d').then(response => {
    //   this.idMenu = response.data._id
    //   this.feeder = response.data.text
    //   console.log(JSON.stringify(response.data))
    //   console.log('created')
    // })
    // axios
    //   .get('')
    //   .then(response => {
    //     this.lease = response.data
    //   })
    //   .catch(error => {
    //     console.log('There was an error', error.response)
    //   })
  }
}
</script>
<style scoped>
.selected {
  background-color: rgba(180, 100, 100, 0.808);
}
</style>

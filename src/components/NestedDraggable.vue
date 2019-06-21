<template>
  <div>
    <div>
      <draggable
        class="dragArea"
        chosenClass="chosen"
        ghostClass="dropTarget"
        animation="250"
        tag="ul"
        :list="lse"
        @change="renumberHandler"
        @end="addToStackHandler"
        @add="addHandler"
        @input="fireInput"
        :group="{ name: 'lseAndFeeder', put: true }"
      >
        <li
          v-for="el in list"
          :key="el.section"
          :id="el.id"
          @dblclick="dblClickHandler"
        >
          <div>
            <div>
              <!-- <div :id="el.id + 'sv'" class="m-fadeOut">
              <font-awesome-icon
                icon="save"
                class="far fa-save fa-lg"
                @click="updateLseHandler(el.id)"
              />
            </div> -->
              <p :id="'sec-' + el.id">
                <span
                  ><font-awesome-icon
                    icon="edit"
                    class="fas fa-edit fa-lg il"
                    @click="editX(el.section, el.verbiage, el.id)"/></span
                >{{ el.section }}
              </p>
              <p
                v-html="el.verbiage"
                contenteditable="true"
                :id="el.id"
                @input="showSaveIcon(el.id)"
              ></p>
            </div>
          </div>

          <NestedDraggable
            :list="el.subsections"
            @renumber-handler="renumberHandler"
            @add-to-stack="addToStackHandler"
            :ce="ce"
            @show-editor="editX('subsequent')"
            @update-lse="updateLseHandler('subsequent')"
            group="lseAndFeeder"
            @find-landing="findLandingX"
            :counter="'subsequent-' + el.id"
          />
        </li>
      </draggable>
    </div>
  </div>
</template>
<script type="module">
// v-bind:class="{ active: isActive }"
import draggable from 'vuedraggable'
import clickAndDragServices from '@/services/ClickAndDragServices.js'

const uuidv1 = require('uuid/v1')
var sectionLocked = null
var verbiageLocked = null
var elIdLocked = null

export default {
  name: 'NestedDraggable',
  display: 'Clone',
  props: {
    list: {
      required: true,
      type: Array
    },
    ce: {
      required: true,
      type: Boolean
    },
    counter: {
      required: true,
      type: String
    }
  },
  components: {
    draggable
  },

  data() {
    return {
      isActive: false,
      randomId: null,
      lse: this.list,
      id: '',
      content: '',
      idCounter: this.idCounter++,
      singleMode: false
    }
  },

  methods: {
    fireInput() {
      alert('input')
    },
    styleNode(ev) {
      if (this.singleMode) {
        ev.target.parentNode.style =
          'background-color: rgba(180, 100, 100, 0.808)'
      } else {
        ev.target.parentNode.style = 'background-color: none'
      }
    },
    dblClickHandler(ev) {
      debugger
      clickAndDragServices.dblClickHandler(ev, this.list)
    },
    showSaveIcon(id) {
      // alert(id)
      var el = document.getElementById(id + 'sv')
      console.log(el)
      el.className = '.m-fadeIn'
      console.log(el)
    },
    findLandingX(evt) {
      // debugger

      this.$emit('find-landing', evt)
    },
    addHandler(evt) {
      // debugger
      this.$emit('find-landing', evt)
      // alert('addHandler')
      // console.log('evt.item')
      // console.log(evt.item)
      // debugger
      // console.log('evt.newIndex')
      // console.log(evt.newIndex)

      // console.log('evt.clone')
      // console.log(evt.clone)
      // console.log('evt.to')
      // console.log(evt.to)

      // If yes, then
      // If index > 0, then getElementById(child n - 1)
      // If index === 0, then getElementById(child n + 1)
      // If children.length === 0,
      // Need to find out how to access parent-like node

      //2. Retrieve section and convert to array index.
      //3. Do the needed splice. Slip into subsections array where needed.
      //If index === 0, then the position must be the first in entire list.

      // console.log(el.parentElement)
      // console.log(el.previousSibling)

      // console.log(el.parent)
      // this.renumberHandler()
    },
    genUUID() {
      var a = uuidv1()
      console.log(a)
      return uuidv1
    },
    toggleActive() {
      this.isActive = !this.isActive
    },
    renumberHandler() {
      // debugger
      // alert('renumber-handler')

      this.$emit('renumber-handler')
    },
    addToStackHandler() {
      // debugger
      this.$emit('add-to-stack')
    },
    updateLseHandler(elId) {
      // alert(elId)
      if (elId !== 'subsequent') {
        elIdLocked = elId
      }

      var el = document.getElementById(elIdLocked)
      var content = el.innerText
      this.$emit('update-lse', elIdLocked, content)
    },

    editX(section, verbiage, elId) {
      if (section !== 'subsequent') {
        sectionLocked = section
        verbiageLocked = verbiage
        elIdLocked = elId
      }
      // else {
      //   id = idLocked
      //   verbiage = verbiageLocked
      // }
      // alert('idLocked ' + id)

      this.$emit('show-editor', sectionLocked, verbiageLocked, elIdLocked)
      this.$emit('force-rerender')
    }
  },
  countDepth: function() {
    return (this.idCounter += 1)
  }
}
</script>
<style scoped>
li {
  list-style-type: none;
  margin-top: 15px;
}
.bulleted {
  list-style-type: disc;
}
.dragArea {
  min-height: 20px;
  border-left: 1px solid lightgray;
}
.chosen {
  background-color: beige;
}
.dropTarget {
  background-color: rgba(222, 236, 241, 0.808);
}

.listSpan {
  margin-left: 20px;
}
.il {
  display: inline;
}

.invisible {
  visibility: hidden;
  transition: visibility 1s;
}
.m-fadeOut {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
}
.m-fadeIn {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 300ms;
}
</style>

<template>
  <div>
    <div>
      <draggable
        class="dragArea"
        animation="250"
        tag="ul"
        :list="liveList"
        :clone="cloneHandler"
        :group="{ name: 'lseAndFeeder', pull: 'clone', put: false }"
        @start="dragStartHandler"
      >
        <li
          v-for="el in liveList"
          :key="el.section"
          :id="el.id"
          @dblclick="dblClickHandler"
          @dragstart="dragStartHandler"
          @dragend="dragEndHandler"
        >
          <div>
            <div>
              <p :id="'sec-' + el.id">
                <span
                  ><font-awesome-icon
                    :id="'faminus-' + el.id"
                    icon="minus"
                    class="fas fa-minus "
                    @click="fold(el)"/></span
                >{{ el.section }}
              </p>
              <p v-html="el.verbiage"></p>
            </div>
            <NestedDraggableFeeder
              :list1="el.subsections"
              @update-lse="updateLseHandler('subsequent')"
              @force-renumber="forceRenumberX"
              @dragstart="dragStartHandler"
            />
          </div>
        </li>
      </draggable>
    </div>
  </div>
</template>
<script type="module">
import draggable from 'vuedraggable'
import clickAndDragServices from '@/services/ClickAndDragServices.js'

var sectionLocked = null
var verbiageLocked = null
var elIdLocked = null

// var currStorage = window.localStorage
// currStorage.setItem('myItem', 'Hello world')

export default {
  name: 'NestedDraggableFeeder',
  display: 'Clone',
  order: 3,
  props: {
    list1: {
      required: false,
      type: Array
    }
  },
  components: {
    draggable
  },

  data() {
    return {
      renderKey: 0
    }
  },
  computed: {
    liveList() {
      return this.list1
    }
  },
  methods: {
    inertDblClick() {},
    dblClickHandler(ev) {
      // console.log(ev.target.id.substring(0, 7))
      // debugger
      if (ev.target.id.substring(0, 7) != 'faminus') {
        clickAndDragServices.dblClickHandler(ev, this.liveList)
      }
    },
    dragEndHandler(evt) {
      clickAndDragServices.dragEndHandler(evt)
    },
    dragStartHandler(evt) {
      clickAndDragServices.dragStartHandler(evt)
    },
    cloneHandler(evt) {
      clickAndDragServices.cloneHandler(evt)
    },
    fold(el) {
      el.subsections.forEach(item => {
        el = document.getElementById(item.id)
        var elHidden = el.classList.contains('hideItem')
        elHidden
          ? el.classList.remove('hideItem')
          : el.classList.add('hideItem')
        console.log(item)
      })
      this.renderKey += 1
    },
    forceRenumberX() {
      this.$emit('force-renumber')
    },
    showSaveIcon(id) {
      // alert(id)
      var el = document.getElementById(id + 'sv')
      console.log(el)
      el.className = '.m-fadeIn'
      console.log(el)
    },
    renumberHandler() {
      // alert('renumber-handler')
      this.$emit('renumber-handler')
    },
    addToStackHandler() {
      this.$emit('add-to-stack')
    },
    updateLseHandler(elId) {
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

      this.$emit('show-editor', sectionLocked, verbiageLocked, elIdLocked)
      this.$emit('force-rerender')
    }
  },
  mounted() {}
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
  height: 25px;
  width: 200px;
  color: gray;
  font-style: italic;
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
.collapser {
  margin-left: -8px;
}
.ghost {
  background-color: orange;
}
.hideItem {
  display: none;
}
.showItem {
  display: block;
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
.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.placeholder {
  width: 150px;
  height: 50px;
  background: #000;
  color: #000;
}

.retain {
  width: 100%;
  height: auto;
  background: #fff;
  color: #000;
}
</style>

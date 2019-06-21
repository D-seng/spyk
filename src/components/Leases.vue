/* eslint-disable vue/return-in-computed-property */
<template>
  <div>
    <h1>Leases</h1>
    <!-- <v-container>
      <v-layout column>
        <v-flex xs12>
     
          <draggable v-model="events" @start="drag = true" @end="drag = false">
            <v-card v-for="ls in events" :key="ls.id" @drop="renumber(ls)">
              {{ ls.title }}
            </v-card>
          </draggable>
        </v-flex>
      </v-layout>
    </v-container>-->
    <v-btn outline block>button</v-btn>

    <!-- <draggable
      :options="{ draggable: '.draggableitem' }"
      element="v-expansion-panel"
      @start="drag = true"
      @end="drag = false"
      @ondrop="dropHandler"
    >
      <v-expansion-panel-content
        class="draggableitem"
        v-for="item in this.items"
        :key="item.id"
        width="100%"
      >
        <div slot="header">{{ item.name }}</div>

        <p>{{ item.text }}</p>
        <draggable
          v-model="item.children"
          @start="drag = true"
          @end="drag = false"
          dragClass="blueDrag"
        >
          <div v-for="child in item.children" :key="child.id">
            {{ child.name }} {{ child.text }}
            <draggable v-model="child.children" @start="drag = true" @end="drag = false">
              <div v-for="child2 in child.children" :key="child2.id">
                {{ child2.name }} {{ child2.text }}
                <draggable v-model="child2.children" @start="drag = true" @end="drag = false">
                  <div
                    v-for="child3 in child2.children"
                    :key="child3.id"
                  >{{ child3.name }} {{ child3.text }}</div>
                </draggable>
              </div>
            </draggable>
          </div>
        </draggable>
      </v-expansion-panel-content>
    </draggable>
    <v-divider></v-divider>
    
    <draggable
      :options="{ draggable: '.draggableitem' }"
      element="v-expansion-panel"
      @start="drag = true"
      @end="drag = false"
      @ondrop="dropHandler"
    >
      <v-expansion-panel-content
        class="draggableitem"
        v-for="item in this.this.items"
        :key="item.id"
        width="100%"
      >
        <div slot="header">{{ item.name }}</div>

        <p contenteditable="false">{{ item.text }}</p>
        <draggable
          v-model="item.children"
          @start="drag = true"
          @end="drag = false"
          :options="{ handle: '++' }"
        >
          <div v-for="child in item.children" :key="child.id">
            <p contenteditable="false">{{ child.name }} {{ child.text }}</p>
            <draggable
              v-model="child.children"
              @start="drag = true"
              @end="drag = false"
            >
              <div v-for="child2 in child.children" :key="child2.id">
                <p contenteditable="false">
                  {{ child2.name }} {{ child2.text }}
                </p>
                <draggable
                  v-model="child2.children"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <div v-for="child3 in child2.children" :key="child3.id">
                    <p contenteditable="false">
                      {{ child3.name }} {{ child3.text }}
                    </p>
                  </div>
                </draggable>
              </div>
            </draggable>
          </div>
        </draggable>
      </v-expansion-panel-content> </draggable
    >-->
    <!-- ********************************************* -->
    <!-- <draggable
      :options="{ draggable: '.draggableitem' }"
      element="v-treeview"
      dragoverBubble="true"
      @start="drag = true"
      @end="drag = false"
      @drop="dropHandler()"
    >-->
    <!-- <v-expansion-panel-content
        class="draggableitem"
        v-for="item in items_with_numbering"
        :key="item.id"
        width="100%"
      >
        <div v-if="item.lev === 1" slot="header">{{item.num }}{{ item.name }} </div>
          <div v-else-if="item.lev === 2"> 
              {{ item.num }}
    

         </div>
          <div v-else-if="item.lev === 3"> 
              {{ item.num }}

         </div>
         <div v-else-if="item.lev === 4"> 
              {{ item.num }}

    </div>-->
    <!-- <draggable
              v-model="child.children"
              @start="drag = true"
              @end="drag = false"
            >
              <div v-for="child2 in child.children" :key="child2.id">
                <p contenteditable="false">
                  {{ fullItemLevel3 }}{{ child2.name }} {{ child2.text }}
                </p>
                <draggable
                  v-model="child2.children"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <div v-for="child3 in child2.children" :key="child3.id">
                    <p contenteditable="false">
                      {{ child3.name }} {{ child3.text }}
                    </p>
                  </div>
                </draggable>
              </div>
            </draggable>
          </div>
    </draggable>-->
    <!-- </v-expansion-panel-content> -->
    <!-- </draggable> -->
    <draggable
      id="dtest"
      @start="drag = true"
      @end="drag = false"
      :options="{ animation: 500 }"
      :list="dragTest"
      v-on:change="update"
    >
      <div v-for="dt in dragTest" :key="dt.num" :data-id="dt.num">
        {{ dt.num }}. {{ dt.text }}
      </div>
    </draggable>

    <v-divider></v-divider>
    <div style="padding-top: 30px"></div>

    <nested-draggable
      @start="drag = true"
      @end="drag = false"
      :options="{ animation: 500 }"
      :list="items"
    >
      <!-- <div
        id="lse"
        v-for="item in items_with_numbering"
        :key="item.order"
        :data-id="item.order"
      >-->
      <div v-for="item in items3" :key="item.order" :id="item.order">
        <LeaseList :lseSection="item"></LeaseList>
      </div>

      <!-- </div> -->
    </nested-draggable>
  </div>
</template>

<script type="module">
import EventService from '@/services/EventService.js'
import draggable from 'vuedraggable'

import LeaseList from '@/components/LeaseList.vue'
// import Sortable from 'sortable'

export default {
  components: {
    draggable,
    LeaseList
  },
  data() {
    return {
      event: null,
      events: [],
      i: 0,
      j: -1,
      k: -1,
      l: -1,
      dragTest: [
        { text: 'item 1', num: '1' },
        { text: 'item 2', num: '2' },
        { text: 'item 3', num: '3' },
        { text: 'item 4', num: '4' },
        { text: 'item 5', num: '5' }
      ],
      // create an array for rendering, a la https://codepen.io/anon/pen/ZwVJrg?editors=1010,
      items: [
        {
          id: 1,
          num: '1.0',
          order: 1,
          name: 'Applications :',
          text: 'Lorem ipsum 1',
          lev: 1,
          children: [
            {
              id: 2,
              num: '1.1',
              order: 2,
              name: 'Calendar',
              text: 'Lorem ipsum 2',
              lev: 2,
              children: [
                {
                  id: 10,
                  num: '1.1.1',
                  order: 3,
                  name: 'rsaa',
                  text: 'Lorem ipsum 3',
                  lev: 3,
                  children: [
                    {
                      id: 11,
                      num: '1.1.1.1',
                      order: 4,
                      name: 'gggaa',
                      text: 'Lorem 4',
                      lev: 4
                    }
                  ]
                }
              ]
            },
            {
              id: 3,
              num: '1.2',
              order: 5,
              name: 'Chrome',
              text: 'Lorem ipsum 5',
              lev: 2
            },
            {
              id: 4,
              num: '1.3',
              order: 6,
              name: 'Webstorm',
              text: 'Lorem ipsum 6',
              lev: 2
            }
          ]
        },
        {
          id: 5,
          num: '2.0',
          order: 7,
          name: 'Documents :',
          text: 'Lorem ipsum 7',
          lev: 1,
          children: [
            {
              id: 6,
              num: '2.1',
              order: 8,
              name: 'vuetify : ',
              text: 'Lorem ipsum 8',
              lev: 2,
              children: [
                {
                  id: 7,
                  num: '2.1.1',
                  order: 9,
                  name: 'src :',
                  text: 'Lorem ipsum 9',
                  lev: 3,
                  children: [
                    {
                      id: 8,
                      num: '2.1.1.1',
                      order: 10,
                      name: 'index : ts :',
                      text: 'Lorem ipsum 10',
                      lev: 4
                    },
                    {
                      id: 9,
                      num: '2.1.1.2',
                      order: 11,
                      name: 'bootstrap : ts : ',
                      text: 'Lorem ipsum 11',
                      lev: 4
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],

      items3: [
        {
          id: 1,
          num: '1.0',
          order: 1,
          name: 'Applications :',
          text: 'Lorem ipsum 1',
          lev: 1
        },
        {
          id: 2,
          num: '1.1',
          order: 2,
          name: 'Calendar',
          text: 'Lorem ipsum 2',
          lev: 2
        },
        {
          id: 10,
          num: '1.1.1',
          order: 3,
          name: 'rsaa',
          text: 'Lorem ipsum 3',
          lev: 3
        },
        {
          id: 11,
          num: '1.1.1.1',
          order: 4,
          name: 'gggaa',
          text: 'Lorem 4',
          lev: 4
        },
        {
          id: 3,
          num: '1.2',
          order: 5,
          name: 'Chrome',
          text: 'Lorem ipsum 5',
          lev: 2
        },
        {
          id: 4,
          num: '1.3',
          order: 6,
          name: 'Webstorm',
          text: 'Lorem ipsum 6',
          lev: 2
        },
        {
          id: 5,
          num: '2.0',
          order: 7,
          name: 'Documents :',
          text: 'Lorem ipsum 7',
          lev: 1
        },

        {
          id: 6,
          num: '2.1',
          order: 8,
          name: 'vuetify : ',
          text: 'Lorem ipsum 8',
          lev: 2
        },

        {
          id: 7,
          num: '2.1.1',
          order: 9,
          name: 'src :',
          text: 'Lorem ipsum 9',
          lev: 3
        },
        {
          id: 8,
          num: '2.1.1.1',
          order: 10,
          name: 'index : ts :',
          text: 'Lorem ipsum 10',
          lev: 4
        },
        {
          id: 9,
          num: '2.1.1.2',
          order: 11,
          name: 'bootstrap : ts : ',
          text: 'Lorem ipsum 11',
          lev: 4
        }
      ]
    }
  },
  methods: {
    incri() {
      alert('incri')
      this.i++
    },
    renumber(ls) {
      console.log('renumber me' + ls.id)
    },
    dropHandler(ev) {
      alert('dropHandler')
      alert(ev)
      console.log(this.dragTest)
    },
    onMoveCallback(evt, originalEvent) {
      alert(evt)
      alert(originalEvent)
    },
    update() {
      this.dragTest.map((item, index) => {
        item.num = index + 1
      })
      for (let i = 0; i < this.dragTest.length; i++) {
        console.log(this.dragTest[i].num + ': ' + this.dragTest[i].text)
      }
    },
    updateComplex() {
      // alert('dropped')
      console.log(this.items3)
      this.items3.map((item, index) => {
        item.order = index + 1
      })
      console.log(this.items3)
    },
    showParent(event) {
      var el = event.target
      alert(el.innerHTML)
    }
    // dropTest(evt) {
    //   console.log(evt.draggedContext.index)
    //   var el = document.getElementById('dtest')
    //   var children = el.getElementsByTagName('div')
    //   var arChildren = Array.from(children)
    //   for (let i = 0; i < arChildren.length; i++) {
    //     arChildren[i].num = i + 1
    //     console.log('Before reset: ' + this.dragTest[i].num)
    //     this.dragTest[i].num = i + 1
    //     console.log('After reset: ' + this.dragTest[i].num)
    //   }
    // }
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    lseSection_with_numbering() {
      const result = []
      let lev1 = 0
      let lev2 = 0
      let lev3 = 0
      let lev4 = 0
      let order = 0

      let objI
      let itemI

      for (let i = 0; i < this.items.length; i++) {
        // use the for loop that uses an index
        // if (item.children) {
        // }
        lev1 += 1

        objI = {
          id: this.items[i].id,
          name: this.items[i].name,
          text: this.items[i].text,
          lev: 1,
          order: order++,
          num: lev1 + '.0'
        }
        result.push(objI)

        itemI = this.items[i]
        if (itemI.hasOwnProperty('children')) {
          lev2 = 0
          //push onto nested array; do the same down to lev3
          for (let j = 0; j < this.items[i].children.length; j++) {
            lev2 += 1

            objI = {
              id: this.items[i].children[j].id,
              name: this.items[i].children[j].name,
              text: this.items[i].children[j].text,
              lev: 2,
              order: order++,
              num: lev1 + '.' + lev2
            }
            // console.log(objI)
            result.push(objI)

            if (this.items[i].children[j].hasOwnProperty('children')) {
              lev3 = 0

              for (
                let k = 0;
                k < this.items[i].children[j].children.length;
                k++
              ) {
                lev3 += 1
                // console.log('lev 3: ' + lev3)
                objI = {
                  id: this.items[i].children[j].children[k].id,
                  name: this.items[i].children[j].children[k].name,
                  text: this.items[i].children[j].children[k].text,
                  lev: 3,
                  order: order++,
                  num: lev1 + '.' + lev2 + '.' + lev3
                }
                // console.log(objI)
                result.push(objI)

                if (
                  this.items[i].children[j].children[k].hasOwnProperty(
                    'children'
                  )
                ) {
                  lev3 = 0

                  for (
                    let l = 0;
                    l < this.items[i].children[j].children[k].children.length;
                    l++
                  ) {
                    lev4 += 1
                    // console.log('lev 3: ' + lev3)
                    objI = {
                      id: this.items[i].children[j].children[k].children[l].id,
                      name: this.items[i].children[j].children[k].children[l]
                        .name,
                      text: this.items[i].children[j].children[k].children[l]
                        .text,
                      lev: 4,
                      order: order++,
                      num: lev1 + '.' + lev2 + '.' + lev3 + '.' + lev4
                    }
                    // console.log(objI)
                    result.push(objI)
                  }
                }
              }
            }
          }
        }
      }
      result.sort(function(a, b) {
        return a.num - b.num
      })
      console.log(result)
      return result
    }
  },

  // fullItemLevel1: {
  //   // getter
  //   get: function() {
  //     return this.itemLevel1
  //   },
  //   // setter
  //   set: function() {
  //     this.itemLevel1++
  //   }
  // },
  // fullItemLevel2: {
  //   // getter
  //   get: function() {
  //     return this.itemLevel1 + '.' + this.itemLevel2
  //   },
  //   // setter
  //   set: function() {
  //     this.itemLevel2++
  //   }
  // },
  // fullItemLevel3: {
  //   // getter
  //   get: function() {
  //     return this.itemLevel1 + '.' + this.itemLevel2 + '.' + this.itemLevel3
  //   },
  //   // setter
  //   set: function() {
  //     this.itemLevel3++
  //   }
  created() {
    EventService.getEventsUnpaginated().then(response => {
      console.log(response.data)
      this.events = response.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p.blueDrag {
  color: green;
}
</style>

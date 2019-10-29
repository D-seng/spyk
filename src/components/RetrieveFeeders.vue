<template>
  <!-- <v-select
    :items="items"
    label="Feeder Clauses"
    @change="selectFeeder"
  ></v-select> -->
  <select id="feeder" class="select-css" name="" @change="selectFeeder">
  </select>
</template>

<script type="module">
import EventServiceAlt from '@/services/EventServiceAlt.js'

export default {
  data() {
    return {
      items: [],
      itemIds: [],
      sel: null
    }
  },
  created() {
    // debugger
    EventServiceAlt.getFeeders().then(response => {
      // debugger
      console.log(response.data.feeders)
      var arrResp = response.data.feeders
      this.sel = document.getElementById('feeder')
      var index = 0
      // debugger

      arrResp.forEach(element => {
        // debugger
        console.log(element._id)
        this.items.push({
          intent: element.intent,
          id: element._id
        })
        var opt = document.createElement('option')
        opt.value = index
        opt.innerHTML = element.intent
        this.sel.appendChild(opt)
        index++
      })

      // this.addToStack()
    })
  },
  methods: {
    selectFeeder(a) {
      // var idIndex = this.items.indexOf(a)
      // var id = this.itemIds[idIndex]
      // console.log(id)
      // this.$emit('get-feeders', id)
      debugger
      console.log(this.items[this.sel.value])
      var id = this.items[this.sel.value].id
      this.$emit('get-feeders', id)
    }
  }
}
</script>

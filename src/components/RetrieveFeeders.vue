<template>
  <v-select
    v-on:change="selectFeeder"
    :items="items"
    label="Feeder Clauses"
  ></v-select>
</template>

<script type="module">
import EventServiceAlt from '@/services/EventServiceAlt.js'

export default {
  data() {
    return {
      items: [],
      itemIds: []
    }
  },
  methods: {
    selectFeeder(a) {
      var idIndex = this.items.indexOf(a)
      var id = this.itemIds[idIndex]
      console.log(id)
      this.$emit('get-feeders', id)
    }
  },
  created() {
    EventServiceAlt.getFeeders().then(response => {
      console.log('feeder')
      var arrResp = response.data.feeders
      arrResp.forEach(element => {
        console.log(element._id)
        this.itemIds.push(element._id)

        this.items.push(element._id)
      })

      // this.addToStack()
    })
  }
}
</script>

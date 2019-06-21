<template>
  <v-select v-on:change="selectLease" :items="items" label="Lease"></v-select>
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
    selectLease(a) {
      var idIndex = this.items.indexOf(a)
      var id = this.itemIds[idIndex]
      this.$emit('get-lease', id)
    }
  },
  created() {
    // debugger
    EventServiceAlt.getSnippets().then(response => {
      var arrResp = response.data.snippets
      arrResp.forEach(element => {
        console.log(element._id)
        this.itemIds.push(element._id)

        this.items.push(
          element.tenant + ' | ' + element.property + ' | ' + element._id
        )
      })

      // this.addToStack()
    })
  }
}
</script>

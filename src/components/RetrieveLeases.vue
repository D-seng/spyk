<template>
  <div>
    <!-- <v-select
      class="my-select"
      :items="items"
      label="Lease"
      :rounded="true"
      @change="selectLease"
    ></v-select> -->

    <select id="sel" class="select-css" name="" @change="selectLease"> </select>
  </div>
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
    EventServiceAlt.getSnippets().then(response => {
      var arrResp = response.data.snippets
      this.sel = document.getElementById('sel')
      var index = 0
      // debugger

      arrResp.forEach(element => {
        // console.log(element._id)
        this.items.push({
          tenant: element.tenant,
          property: element.property,
          id: element._id
        })
        var opt = document.createElement('option')
        opt.value = index
        opt.innerHTML = element.tenant
        this.sel.appendChild(opt)
        index++
      })

      // this.addToStack()
    })
  },
  methods: {
    showAlert(a) {
      console.log(a.target)
    },
    selectLease() {
      console.log(this.items[this.sel.value])
      var id = this.items[this.sel.value].id
      this.$emit('get-lease', id)
    }
  }
}
</script>
<style scoped>
.my-select {
  /* border: 1px solid green;
  background-color: blue; */
}
.sel {
  border: 1px solid green;
}
</style>

import store from '../vuex/store'

export default {
  styleNode(el, addStyle) {
    // let el = document.getElementById(elId)
    if (addStyle) {
      el.children[0].children[0].style =
        'background-color: rgba(180, 100, 100, 0.808)'
    } else {
      el.children[0].children[0].style = 'background-color: none'
    }
  },
  dblClickHandler(ev, sourceList) {
    debugger
    ev.stopPropagation()
    var el = ev.target

    do {
      el = el.parentNode
    } while (el.nodeName != 'LI')

    var dblClickedAlready = store.state.vxClones.filter(
      item => item[0] === el.id
    )

    // Check if it's already been double-clicked.
    if (dblClickedAlready.length === 0) {
      // If it hasn't been double-clicked, then:
      //    1. Retrieve the element from the source list that's rendered in the DOM.
      //    2. Because the element will need to have its
      //       subsections hidden when dragged, overriding
      //       the default behavior of nestedDraggable, we
      //       need to save any subsections so that later, upon dragging, they can
      //       be found and hidden.
      //    3. Add the element id to the vxClones array; include
      //       the subsections in the second item of the nested two-item array.

      var result = sourceList.filter(item => item.id === el.id)
      // if (result.length > 0) {
      if (result[0].subsections.length > 0) {
        var subsectionsArray = []
        result[0].subsections.forEach(item => {
          subsectionsArray.push(item.id)
        })
      }
      store.dispatch('stowClone', [el.id, subsectionsArray])
      // }
      this.styleNode(el, true)
    } else {
      var indexOfId
      // result = this.$store.state.vxClones.filter(item => item[0] === el.id)
      for (var i = 0; i < store.state.vxClones.length; i++) {
        if (store.state.vxClones[i][0] === el.id) {
          indexOfId = i
          break
        }
      }
      store.state.vxClones.splice(indexOfId, 1)
      this.styleNode(el, false)
    }
  },
  dragStartHandler(evt) {
    var result = store.state.vxClones.filter(item => item[0] === evt.target.id)
    if (result.length > 0) {
      // debugger
      var el
      var arr
      if (typeof result[0][1] != 'undefined') {
        arr = result[0][1]
        arr.forEach(item => {
          el = document.getElementById(item)
          el.style = 'display: none'
        })
      }
    }
  },
  dragEndHandler(evt) {
    // alert('dragend')
    var result = store.state.vxClones.filter(item => item[0] === evt.target.id)
    if (result.length > 0) {
      // debugger
      var el
      var arr
      if (typeof result[0][1] != 'undefined') {
        arr = result[0][1]
        arr.forEach(item => {
          el = document.getElementById(item)
          el.style = 'display: block'
        })
      }
    }
  },
  cloneHandler(evt) {
    // debugger
    var result = store.state.vxClones.filter(item => item[0] === evt.id)
    if (result.length > 0) {
      var vxClone = {
        id: evt.id,
        verbiage: evt.verbiage,
        section: evt.section,
        subsections: []
      }
      console.log('evt.clone')
      console.log(evt.clone)
      // debugger
      // DO WE NEED THIS NOW, AFTER PUTTING THE ARRAY OF DBLS INTO VXCLONES?
      store.dispatch('setClone', vxClone)
    }
  }
}

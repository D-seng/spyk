import store from '../store'

// Vue.use(Vuex)
var inSingleMode = []
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
  dblClickHandler(ev, list) {
    // debugger
    ev.stopPropagation()
    var el = ev.target
    var result

    // debugger
    console.log('ev.target')
    console.log(ev.target)
    do {
      el = el.parentNode
    } while (el.nodeName != 'LI')
    // debugger

    // Use Vuex for inSingleMode?
    var dblClicked = inSingleMode.filter(item => item[0] === el.id)

    if (dblClicked.length === 0) {
      // then add

      result = list.filter(item => item.id === el.id)
      if (result.length > 0) {
        if (result[0].subsections.length > 0) {
          var subsectionsArray = []
          // this.buildSubsectionsArray(result[0].subsections)
          result[0].subsections.forEach(item => {
            subsectionsArray.push(item.id)
          })
        }
        inSingleMode.push([el.id, subsectionsArray])
      }

      this.styleNode(el, true)
    } else {
      // then remove
      // debugger
      var indexOfId
      result = inSingleMode.filter(item => item[0] === el.id)
      for (var i = 0; i < inSingleMode.length; i++) {
        if (inSingleMode[i][0] === el.id) {
          indexOfId = i
          break
        }
      }
      // var indexOfId = this.inSingleMode.indexOf(result)
      inSingleMode.splice(indexOfId, 1)

      this.styleNode(el, false)
    }
  },
  dragStartHandler(evt) {
    // debugger
    // console.log('evt.target section')
    // console.log(evt.target.children[0].children[0].children[0].innerText)
    // debugger
    var result = inSingleMode.filter(item => item[0] === evt.target.id)
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
    var result = inSingleMode.filter(item => item[0] === evt.target.id)
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
    var result = inSingleMode.filter(item => item[0] === evt.id)
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
      store.dispatch('setNewClone', vxClone)
    }
  }
}

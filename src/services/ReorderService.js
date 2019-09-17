const uuidv4 = require('uuid/v4')
import store from '../vuex/store'
var insertAfter
var subsectionEl, sec, mode
var lease, feeder
var pos
var exitSchArr = false

const setLease = () => (lease = store.state.lease)
const setFeeder = () => (feeder = store.state.feeder)

export default {
  findLanding(evt) {
    debugger
    setLease()
    setFeeder()

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

          sec = subsectionEl.children[0].children[0].children[0].innerText
        } else {
          mode = 'firstOfMany'
          sec = subsectionEl.children[0].children[0].children[0].innerText
        }
      } else {
        mode = 'notFirst'
        subsectionEl = evt.to.children[evt.newIndex - 1]
        sec = subsectionEl.children[0].children[0].children[0].innerText
        insertAfter = true
      }
    }

    this.assignSection(evt)
    debugger
    this.renumber(lease)
  },

  // schArr(arr, newContent) {
  //   // debugger

  //   return this.schArrX(arr, newContent.elId)
  // },

  schArr(arr, elId) {
    debugger
    var result = arr.filter(item => item.id === elId)
    if (result.length === 0 && exitSchArr === false) {
      var ss = arr.filter(item => item.subsections.length > 0)
      if (ss.length > 0) {
        for (var i = 0; i < ss.length; i++) {
          this.schArr(ss[i].subsections, elId)
        }
      }
    } else {
      //debugger

      exitSchArr = true
      var sec = result[0].section.toString()
      console.log(sec)
      if (sec.length > 1) {
        var arrSec = sec.split('.')
        pos = 'lease[' + arrSec[0] + ']'
        for (var k = 1; k < arrSec.length; k++) {
          pos = pos + '.subsections[' + (arrSec[k] - 1) + ']'
        }
        return pos
      } else {
        pos = 'lease[' + sec + ']'
        return pos
      }

      //DEBUG THIS. THE IF-THEN STATEMENT BLOCKS ARE
      //OFF BY A BRACKET SOMEWHERE.
      //debugger
      //return pos
      // var el = eval(pos)
      // console.log(el)
      // debugger
      // el.verbiage = this.newContentText

      // console.log(el)
    }
    return pos
  },
  assignSection(evt) {
    //
    var pos
    var lastBracket
    var arrSec = []
    var k
    var newObj

    if (store.state.vxClone) {
      newObj = store.state.vxClone
      store.dispatch('deleteClone')
    } else {
      // Use LI searcher here

      var evtItemSec = evt.item.children[0].children[0].children[0].innerText
      if (evtItemSec.indexOf('.') === -1) {
        pos = feeder[evtItemSec]
      } else {
        k = 0
        arrSec = evtItemSec.split('.')
        pos = 'feeder[' + arrSec[0] + ']'
        for (k = 1; k < arrSec.length; k++) {
          pos = pos + '.subsections[' + (arrSec[k] - 1) + ']'
        }
      }

      var fObj = eval(pos)

      newObj = {
        id: fObj.id,
        section: fObj.section,
        verbiage: fObj.verbiage,
        subsections: fObj.subsections
      }
    }
    if (mode === 'root') {
      lease.splice(sec, 0, newObj)
    } else {
      arrSec = sec.split('.')
      pos = 'lease[' + arrSec[0] + ']'
      for (k = 1; k < arrSec.length; k++) {
        pos = pos + '.subsections[' + (arrSec[k] - 1) + ']'
      }
      lastBracket = pos.lastIndexOf('[')
      var posTrunc = pos.substring(0, lastBracket)

      switch (mode) {
        case 'notFirst':
          if (insertAfter) {
            eval(posTrunc + '.splice(arrSec[k - 1],0, newObj)')
            insertAfter = false
          } else {
            eval(posTrunc + '.splice(arrSec[k - 1] - 1,0, newObj)')
          }
          break
        case 'firstOfMany':
          eval(pos + '.subsections.splice(0,0, newObj)')
          break
        case 'firstOfOne':
          eval(pos + '.subsections[0] = newObj')
      }
    }
    store.dispatch('updateLease', lease)
    pos = null
  },
  renumber(arrToReorder) {
    var subsequent = false
    var prefix = ''
    this.renumberDetail(arrToReorder, subsequent, prefix)
  },

  renumberDetail(arrToReorder, subsequent, prefix) {
    // debugger
    var arrNextLevel = []
    var newId
    var patt = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    arrToReorder.forEach(function(item) {
      if (item.id.toString().match(patt) === null) {
        newId = uuidv4()
        item.id = newId
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
      this.renumberDetail(arrNextLevelCopy[i][1], subsequent, prefix)
    }

    this.reorder = arrToReorder
  }
}

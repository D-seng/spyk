// const _ = require('lodash')

export default {
  flatten(arr) {
    var arrFlattened = []
    var maxLev = 0
    var obj

    function flattenX(arr) {
      arr.forEach(x => {
        if (x.subsections.length > 0) {
          obj = Object.assign({}, x, {
            subsections: [],
            level: x.section.toString().split('.').length - 1
          })
          arrFlattened.push(obj)
          maxLev = Math.max(maxLev, obj.level)
          flattenX(x.subsections)
        } else {
          obj = Object.assign({}, x, {
            subsections: [],
            level: x.section.toString().split('.').length - 1
          })
          arrFlattened.push(obj)
          maxLev = Math.max(maxLev, obj.level)
        }
      })
      arrFlattened.sort((a, b) => (a.section > b.section ? 1 : -1))
    }
    flattenX(arr)
    return arrFlattened
  },

  createNested(arr) {
    var arrNested = []
    var parentSection
    var arrPreviousLevel = []
    var maxLev = this.getMaxLevel(arr)
    for (let i = 0; i <= maxLev; i++) {
      var arrLevel = arr.filter(item => {
        return item.level === i
      })
      if (i === 0) {
        arrNested.push(arrLevel)
      } else {
        arrLevel.forEach(lseNode => {
          if (lseNode.section === '0.1.1.1') {
            debugger
          }
          parentSection = lseNode.section.substr(
            0,
            lseNode.section.lastIndexOf('.')
          )
          var parentLseNode = arrPreviousLevel.find(
            elem => elem.section.toString() === parentSection
          )
          parentLseNode.subsections.push(lseNode)
        })
      }
      arrPreviousLevel = arrLevel
    }
    //Why is index 0 needed?
    return arrNested[0]
  },

  // Utility function.
  getMaxLevel(arr) {
    let levs = arr.map(elem => elem.section.toString().split('.').length - 1)
    return Math.max.apply(null, levs)
  }
}

// console.log('arrNested')
// console.log(JSON.stringify(arrNested[0]))

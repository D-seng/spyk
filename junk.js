function findCategory(categoryName) {
  var trail = []
  var found = false

  function recurse(categoryAry) {
    for (var i = 0; i < categoryAry.length; i++) {
      trail.push(categoryAry[i].category)

      // Found the category!
      if (categoryAry[i].category === categoryName) {
        found = true
        break

        // Did not match...
      } else {
        // Are there children / sub-categories? YES
        if (categoryAry[i].children.length > 0) {
          recurse(categoryAry[i].children)
          if (found) {
            break
          }
        }
      }
      trail.pop()
    }
  }

  recurse(catalog)

  return trail
}

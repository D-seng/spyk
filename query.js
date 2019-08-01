db.posts.insertOne({
  title: 'first post',
  text: 'I hope you like it.',
  creator: ObjectId('5d2b8f4ed9aabd81361d20da'),
  comments: [
    { text: 'cool post', author: ObjectId('5d2b8f4ed9aabd81361d20db') }
  ]
})

var arrNew
function createFlat(arr) {
arr.forEach(x => {
  if (x.subsections.length > 0) {
    createFlat(subsections)
  } else {
    arrNew.push(x)
  }
}


})
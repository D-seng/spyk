const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.set('timestamps', true)
userSchema.virtual('fullName').get(function() {
  var first = this.first.toLowerCase()
  first = first.charAt(0).toUpperCase()

  var last = this.last.toLowerCase()
  last = last.charAt(0).toUpperCase()

  return first + ' ' + last
})
userSchema.pre('save', function(next) {
  this.username = this.username.toLowerCase()
  this.first = this.first.toLowerCase()
  this.last = this.last.toLowerCase()
  next()
})

module.exports = mongoose.model('user', userSchema)

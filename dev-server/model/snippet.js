const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
  text: {
    type: Array,
    required: true
  },
  tenant: {
    type: String,
    required: true
  },
  landlord: {
    type: String,
    required: true
  },
  property: {
    type: String,
    required: true
  }
})

const Snippet = mongoose.model('Snippet', snippetSchema)
exports.Snippet = Snippet
exports.snippetSchema = snippetSchema

// To do: Add contributor to schema
//contributor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

//   title: {
//   type: String,
//   required: true
// },
// landlord: {
//   type: String
// },
// tenant: {
//   type: String
// },

const mongoose = require('mongoose')

const feederSchema = new mongoose.Schema({
  verbiage: {
    type: Array,
    required: true
  },
  intent: {
    type: String,
    required: true
  }
})

const Feeder = mongoose.model('Feeder', feederSchema)
exports.Feeder = Feeder
exports.feederSchema = feederSchema

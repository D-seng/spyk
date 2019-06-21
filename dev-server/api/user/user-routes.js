const express = require('express')
const controller = require('./user-controller.js')

const router = express.Router()

router.get('/user', controller.index)

router.get('/user/:id', (req, res) => {
  res.send('get a user')
})
module.exports = router

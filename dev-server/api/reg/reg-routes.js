const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/register', (req, res) => {
  var token = jwt.sign('register', config.get('jwtSecretKey'))
  res.send('register')
})

module.exports = router

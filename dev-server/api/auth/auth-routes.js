const express = require('express')
const router = express.Router()

router.post('/auth', (req, res) => {
  res.send('log in')
})

module.exports = router

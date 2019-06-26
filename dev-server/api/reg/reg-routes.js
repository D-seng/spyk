const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../../model/user')

router.post('/register', async (req, res) => {
  var token = jwt.sign('register', config.get('jwtSecretKey'))

  const user = new User({
    username: req.body.username,
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    password: req.body.password
  })
  const result = await user.save()
  //.insertOne({ text: req.body, createdAt: new Date() })
  // res.status(201).send(snippet)
  console.log(result)
  res.send(result)

  res.send(token)
})

module.exports = router

const express = require('express')
const controller = require('./user-controller.js')
const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../../model/user')
const bcryptjs = require('bcryptjs')

const router = express.Router()

router.get('/user', controller.index)

router.get('/user/:id', (req, res) => {
  res.send('get a user')
})

router.post('/register', async (req, res) => {
  const salt = await bcryptjs.genSalt(10)
  const hash = await bcryptjs.hash(req.body.password, salt)
  let user = await User.findOne({ email: req.body.email })

  if (!user) {
    let user = new User({
      username: req.body.username,
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: hash
    })
    var token = jwt.sign({ _id: user._id }, config.get('jwtSecretKey'))
    user = await user.save()
    //.insertOne({ text: req.body, createdAt: new Date() })
    // res.status(201).send(snippet)
    // console.log(result)
    res.send(token)
  } else {
    return res.status(400).send('User already in database')
  }
})

module.exports = router

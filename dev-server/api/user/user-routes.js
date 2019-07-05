const express = require('express')
// const controller = require('./user-controller.js')
const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../../model/user')
const bcryptjs = require('bcryptjs')
const Joi = require('joi')
const nodemailer = require('nodemailer')
const router = express.Router()

// router.get('/user', controller.index)

router.get('/user/:id', (req, res) => {
  res.send('get a user')
})

router.post('/auth', async (req, res) => {
  var errorsToSend = []

  const { error } = validate(req.body)
  if (error) {
    errorsToSend.push(error.details[0].message)
  }

  let user = await User.findOne({ email: req.body.email })
  if (!user) {
    errorsToSend.push('Invalid email or password.')
  } else {
    const validPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    )
    if (!validPassword) {
      errorsToSend.push('Invalid email or password')
    }
  }

  if (errorsToSend.length > 0) {
    return res.status(401).send(errorsToSend)
  }
  var token = jwt.sign({ _id: user._id }, config.get('jwtSecretKey'))
  return res.header('x-auth-token', token).send(user)
})

router.post('/register', async (req, res) => {
  const salt = await bcryptjs.genSalt(10)
  const hash = await bcryptjs.hash(req.body.password, salt)
  // let user = await User.findOne({ email: req.body.email })

  var errorsToSend = []

  const { error } = validate(req.body)
  if (error) {
    errorsToSend.push(error.details[0].message)
  }

  let user = await User.findOne({ email: req.body.email })
  if (user) {
    errorsToSend.push('Email already registered.')
  }

  if (errorsToSend.length > 0) {
    return res.status(401).send(errorsToSend)
  }

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
    res.header('x-auth-token', token).send(user)
    //.insertOne({ text: req.body, createdAt: new Date() })
    // res.status(201).send(snippet)
    // console.log(result)

    // let testAccount = await nodemailer.createTestAccount()

    // let transporter = nodemailer.createTransport({
    //   // service: 'gmail',
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     type: 'OAuth2',
    //     user: 'darren.dev99@gmail.com'
    //     // pass: config.get('emailPassword')
    //   }
    // })

    // let info = await transporter.sendMail({
    //   from: 'darren.dev99@gmail.com', // sender address
    //   to: 'darren.cre99@gmail.com', // list of receivers
    //   subject: 'Hello ✔', // Subject line
    //   text: 'Hello world?', // plain text body
    //   html: '<b>Hello world?</b>' // html body
    // })
    // console.log('Message sent: %s', info.messageId)
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    // SEND EMAIL.
  }
})
function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(50)
      .required()
  }

  return Joi.validate(req, schema)
}

module.exports = router

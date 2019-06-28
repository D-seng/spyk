const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const Joi = require('joi')
const { User } = require('../../model/user')

router.post('/auth', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email or password.')

  const validPassword = await bcryptjs.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password.')

  // var token = jwt.sign({ _id: user._id }, config.get('jwtSecretKey'))

  res.send(true)
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

const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const { User } = require('../../model/user')
const config = require('config')

module.exports = router

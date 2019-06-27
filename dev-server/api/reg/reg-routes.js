const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../../model/user')



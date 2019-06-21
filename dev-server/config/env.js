const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = function setEnvironment (app) {
  if (process.env.NODE_ENV !== 'production') {
    setDevEnv(app)
  } else {
    setProdEnv(app)
  }
}

function setDevEnv (app) {
  process.env.NODE_ENV = 'development'
  process.env.DB_URL = 'mongodb://localhost:27017/lx'
  app.use(bodyParser.json())
  app.use(morgan('dev'))
  app.use(cors())
}

function setProdEnv (app) {
  process.env.DB_URL = 'mongodb://localhost:27017/lx-prod'
  app.use(bodyParser.json())
  app.use(express.static(__dirname + '/..dist'))
}

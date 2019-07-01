process.env.NODE_CONFIG_DIR = './config'
const config = require('config')

const express = require('express')
const registerRoutes = require('./dev-server/routes.js')
const setEnvironment = require('./dev-server/config/env.js')
const connectToDb = require('./dev-server/config/db.js')

const app = express()

if (!config.get('jwtSecretKey')) {
  console.log('FATAL ERROR: jwtSecretKey is not defined')
  process.exit(1)
}

setEnvironment(app)
connectToDb()
registerRoutes(app)

app.get('/', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    res.send('Running server in development mode')
  } else {
    res.sendFile('index.html', { root: __dirname + '/../dist/' })
  }
})

const port = 3000
const env = process.env.NODE_ENV
app.listen(port, () => console.log(`Listening on port ${port} in ${env} mode!`))

// module.exports = db

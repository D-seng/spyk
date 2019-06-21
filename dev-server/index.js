const express = require('express')
const registerRoutes = require('./routes.js')
const setEnvironment = require('./config/env.js')
const connectToDb = require('./config/db.js')

const app = express()

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

const snippetRoutes = require('./api/snippets/snippet-routes.js')
const feederRoutes = require('./api/feeders/feeder-routes.js')
const authRoutes = require('./api/auth/auth-routes.js')
const regRoutes = require('./api/reg/reg-routes.js')
const userRoutes = require('./api/user/user-routes.js')

module.exports = function registerRoutes(app) {
  app.use('/api', snippetRoutes)
  app.use('/api', authRoutes)
  app.use('/api', regRoutes)
  app.use('/api', userRoutes)
  app.use('/api', feederRoutes)
}

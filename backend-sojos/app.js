const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const loginRouter = require('./controllers/login')
const gatheringsRouter = require('./controllers/gatherings')
const usersRouter = require('./controllers/users')
const emailRouter = require('./controllers/email')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const path = require('path')
const { default: sslRedirect } = require('heroku-ssl-redirect')



logger.info('connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

if(process.env.NODE_ENV === 'production'){app.use(sslRedirect())}
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(middleware.morganLog)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/gatherings', gatheringsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/email', emailRouter)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


if(process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
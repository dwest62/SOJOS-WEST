
const logger = require('./logger')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('./config')

morgan.token('req', function(req){
  return JSON.stringify(req.body)
})

const morganLog = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.req(req , res),
  ].join(' ')
})

const tokenExtractor = (request,response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
    next()

  } else {
    request.token = null
    next()
  }
}

const userExtractor = (request,response, next) => {
  const token =request.token
  if(token){
  const decodedToken = jwt.verify(token, config.SECRET )
  request.user = decodedToken.id
  console.log('user',request.user)}
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

module.exports = {
  morganLog,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
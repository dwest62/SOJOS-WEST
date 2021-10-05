const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length < 4){
    response.status(400).send({ error: 'password must be at least 3 characters long' })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      core:body.core,
      username: body.username,
      firstName:body.firstName,
      lastName: body.lastName,
      passwordHash: passwordHash,
      kid: body.kid
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).sort({lastName:+1})

  response.json(users)
})

module.exports = usersRouter

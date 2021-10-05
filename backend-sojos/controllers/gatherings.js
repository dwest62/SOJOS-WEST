/* eslint-disable no-unused-vars */
const gatheringsRouter = require('express').Router()
const Gathering = require('../models/gathering')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


gatheringsRouter.get('/', async (_request, response) => {
  const gatherings = await Gathering.find({}).sort({postDate:-1}).populate('user', { username: 1, firstName:1, lastName:1 })
  response.json(gatherings)
})

gatheringsRouter.get('/:id', async (request, response) => {
  const gathering = await Gathering.findById(request.params.id)
  if (gathering) {
    response.json(gathering)
  } else {
    response.status(404).end
  }
})

gatheringsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  if (!token || !request.user){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.user)
  const users = await User.find({})

  const result = () =>{
    let result = []
    for(let i = 0; i < users.length; i++){ 
      result = result
        .concat({
          username: users[i].username,
          lastName: users[i].lastName,
          firstName: users[i].firstName,
          kid: users[i].kid,
          rsvp:'undecided'
        })
   }
   return result
  }

  const gathering = new Gathering({
    
    rsvp: result().sort((a,b) => {
      if(a.lastName < b.lastName){ return -1 }
      if(a.lastName > b.lastName){ return 1 }
      return 0
    }),
    postDate:body.postDate,
    date: body.date,
    startTime: body.startTime,
    endTime: body.endTime,
    content: body.content,
    user: user.id,
    location: body.location
  })

  const savedGathering = await gathering.save()
  user.gatherings = user.gatherings.concat(savedGathering._id)
  await user.save()

  response.status(201).json(savedGathering)
})

gatheringsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const gathering = await Gathering.findById(request.params.id)
  gathering.comments
    ? gathering.comments = gathering.comments.concat(body.comment)
    : gathering.comments = [body.comment]
  await gathering.save()

  response.status(201).json(gathering)
})

gatheringsRouter.get('/:id/comments', async (request, response) => {
  const gathering = await Gathering.findById(request.params.id)
  gathering.comments
  ? response.json(gathering.comments)
  : response.status(404).end
})

gatheringsRouter.delete('/:id', async (request, response) => {
  const gathering = await Gathering.findById(request.params.id)
  if(gathering.user.toString() === request.user.toString()){
    await Gathering.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'userid invalid' })
  }
})

gatheringsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const gathering = {
    rsvp: body.rsvp,
    date: body.date,
    startTime: body.startTime,
    endTime: body.endTime,
    content: body.content,
    user: body.user.id,
    location: body.location
   }
  const updateGathering = await Gathering.findByIdAndUpdate(request.params.id, gathering, { new: true })
  response.json(updateGathering)
})

gatheringsRouter.put('/:id/rsvp', async (request, response) =>{
  const body = request.body

  const gathering = await Gathering.findById(request.params.id)

  const updatedGathering = gathering.rsvp.map(
    data => data.username === body.rsvp.username
      ? body.rsvp
      : data 
  )
  gathering.rsvp = updatedGathering
  await gathering.save()
  response.json(gathering)
})

gatheringsRouter.post('/:id/rsvp', async (request, response) => {
  const body = request.body

  const gathering = await Gathering.findById(request.params.id)
  gathering.rsvp = body.rsvp
  await gathering.save()
  response.json(gathering)
})

module.exports = gatheringsRouter
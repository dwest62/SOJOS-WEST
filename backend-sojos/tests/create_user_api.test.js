/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')


test('responds with error message 400 bad request when title or url are missing', async () => {
  const newUserNonUniqueUsername = {
    username: 'James',
    name: 'James',
    password: 'James'
  }
  const newUserShortPassword = {
    username: 'Jimmy',
    name: 'Jimmy',
    password: 'hi'
  }
  await api
    .post('/api/users')
    .send(newUserNonUniqueUsername)
    .expect(400)
  await api
    .post('/api/users')
    .send(newUserShortPassword)
    .expect(400)
},100000)



afterAll(() => {
  mongoose.connection.close()
})
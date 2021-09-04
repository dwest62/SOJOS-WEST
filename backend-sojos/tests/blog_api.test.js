/* eslint-disable no-undef */
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// eslint-disable-next-line no-undef
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(data => new Blog(data))
  const promiseArray = blogObjects.map(data => data.save())
  await Promise.all(promiseArray)
  await api
    .post('/api/login')
    .send({username:'James', password:'password'})
},1000000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const url = response.body.map(data => data.url)

  expect(url).toContain(
    'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
  )
})

test('the unique identifier of property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.id).toBeDefined
})

test('missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'React tests well',
    author: 'ForFilter!!',
    url: 'https://placeholder.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: helper.token })
  const blogsAtEnd = await helper.blogsInDb()
  const filteredBlogs = blogsAtEnd.filter(data => data.author === 'ForFilter!!')
  expect(filteredBlogs[0].likes).toBe(0)
})


describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'React tests well',
      author: 'Placeholder Name',
      url: 'https://placeholder.com/',
      likes: 7,
    }
    const user = {username: 'James', password:'password'}
    await api
      .post('/api/login')
      .send(user)
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: helper.token })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const url = blogsAtEnd.map(data => data.url)
    expect(url).toContain(
      'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
    )
  })
  test('responds with error message 401 Unauthorized when using invalid token', async() => {
    const newBlog = {
      title: 'React tests well',
      author: 'Placeholder Name',
      url: 'https://placeholder.com/',
      user:'6112ce32ba4a4df423336827',
      likes: 7,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: 'BadAuthorizationToken' })
      .expect(401)
  })
  test('responds with error message 400 bad request when title or url are missing', async () => {
    const newBlogNoTitle = {
      author: 'Placeholder Name',
      url: 'https://placeholder.com/',
      likes: 7,
    }
    const newBlogNoUrl = {
      author: 'Placeholder Name',
      url: 'https://placeholder.com/',
      likes: 7,
    }
    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .set({ Authorization: helper.token })
      .expect(400)
    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .set({ Authorization: helper.token })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
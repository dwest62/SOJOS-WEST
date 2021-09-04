const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user:'6112ce32ba4a4df423336827',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Robert C. Martin',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user:'6112ce32ba4a4df423336827',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 17,
    user:'6112ce32ba4a4df423336827',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user:'6112ce32ba4a4df423336827',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user:'6112ce32ba4a4df423336827',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Edsger W. Dijkstra',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user:'6112ce32ba4a4df423336827',
    __v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethis',
    author: 'Some Author',
    qurl: 'https://someurl.com/',
    likes: 7,
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(data => data.toJSON())
}

const initialUsers = [
  {
    blogs: [
      '610d642cfd12b9ce2ca1e055'
    ],
    username: 'James',
    name: 'James',
    id: '610d5f338cd098c6dc52e72d'
  },
  {
    blogs: [ ],
    username: 'Superuser',
    name: 'Superuser',
    id: '610d5fe3dce157c821443c9d'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return (users.map(data => data.toJSON()))
}

const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiI2MTEwMWI0NmMxZTk4ODUwN2YxNTcxYjYiLCJpYXQiOjE2Mjg0NzA3NTZ9.KDLt-37kdpIRuxabdpCO78Av4p463kK4AQ3oyV_SNA0'


module.exports = {
  initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb, token
}
/* eslint-disable no-undef */
const listHelper = require('../utils/list_helper')


const listWithEmptyBlog= []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Robert C. Martin',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 17,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Edsger W. Dijkstra',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const blogsWithLikesMissing = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list is empty return 0', () => {
    const result = listHelper.totalLikes(listWithEmptyBlog)
    expect(result).toBe(0)
  })

  test('when list has multiple blogs, equals the sum of the likes in those blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(41)
  })

  test(`when list has multiple blogs, and a blog has an empty likes field. 
  equals sum of the likes in those blogs.`, () => {
    const result = listHelper.totalLikes(blogsWithLikesMissing)
    expect(result).toBe(26)
  })
})

describe('favoriteBlog', () => {
  test('when list has multiple blogs and a blog has and empty like field. equals most liked blog.', () => {
    const result = listHelper.favoriteBlog(blogsWithLikesMissing)
    expect(result).toBe(blogsWithLikesMissing[2])
  })
})

describe('mostBlogs', () => {
  test('when list has multiple blogs expect result to be {author: <author with most blogs>, blogs: < # of blogs posted >}', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toStrictEqual({ 'author': 'Robert C. Martin', 'blogs': 3 })
  })
  test('when list is empty return no data', () => {
    const result = listHelper.mostBlogs(listWithEmptyBlog)
    expect(result).toBe('No current blog entries')
  })

  test('when list has only 1 blog returns data for that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toStrictEqual({ 'author': 'Edsger W. Dijkstra', 'blogs': 1 })
  })
})

describe('getAuthorWithMostLikes', () => {
  test('when blog list contains multiple entries, display author and likes for the author with the most likes.', () => {
    const result = listHelper.getAuthorWithMostLikes(blogs)
    expect(result).toStrictEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 19 })
  })

  test('when list is empty return no data', () => {
    const result = listHelper.getAuthorWithMostLikes(listWithEmptyBlog)
    expect(result).toBe('No current blog entries')
  })

  test('when list has only 1 blog returns data for that blog', () => {
    const result = listHelper.getAuthorWithMostLikes(listWithOneBlog)
    expect(result).toStrictEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 5 })
  })
})
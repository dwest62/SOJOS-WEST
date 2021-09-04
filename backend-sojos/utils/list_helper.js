const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const blogLikes = blogs.map(data => data.likes ? data.likes : 0)
  const reducer = (sum, item) => {
    return(sum + item)
  }

  return (
    blogLikes.reduce(reducer, 0)
  )
}

const favoriteBlog = (blogs) => {
  return(
    blogs.reduce((prevNumber, currentNumber) => {
      return(
        (currentNumber.likes > prevNumber.likes) ? currentNumber : prevNumber
      )
    })
  )
}

// Most Blogs option A -

const authorsArr = (blogs) => {
  const result = blogs.map(data => data.author)
  return result
}

const countObject = arr => arr.reduce((obj,e) => {
  obj[e] =(obj[e] || 0) + 1
  return obj
},{})

const authorBlogCountMap = (blogs) => {
  return (
    countObject(authorsArr(blogs))
  )
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return ('No current blog entries')
  } else {
    const obj = authorBlogCountMap(blogs)
    const list = Object.values(obj)
    const max = Math.max(...list)
    const asArr = Object.entries(obj)
    // eslint-disable-next-line no-unused-vars
    const filterAsArray = asArr.filter(([key , value]) => value === max)
    const result = { author: filterAsArray[0][0], blogs: filterAsArray[0][1]}
    return (
      result
    )
  }
}

/* Most Blogs option B - sorting list alphabetically then counting using reduce.

const mostBlogs = (blogs) => {
  const sortedBlogsByName = blogs.sort((a,b) => {
    const nameA = a.author.toUpperCase()
    const nameB = b.author.toUpperCase()
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })

  let result = []
  const getBlogsCountForAuthor =
    sortedBlogsByName.reduce((accum, current) => {
      if (result.length === 0){
        result = result.concat({author: current.author, blogs: 1})
      } else {
        if(result[result.length-1].author !== current.author){
          result = result.concat({author: current.author, blogs: 1})
        } else {
          result[result.length -1].blogs++
        }
      return (result)
      }
    },[]
      )
    console.log('getBlogCount', getBlogsCountForAuthor)

  let mostBlogs=[]
  const reduceBlogs = getBlogsCountForAuthor.reduce((accum, current) => {
    if (mostBlogs.length === 0){
      mostBlogs = current
    } else {
      if(current.blogs > mostBlogs.blogs){
        return mostBlogs = current}
      }
    return (mostBlogs)
  },[])
  return (reduceBlogs)
  }*/

const getAuthorWithMostLikes = (blogs) => {
  if(blogs.length === 0){
    return ('No current blog entries')
  } else {
    let result ={ likes:0 }
    for (let i=0; i<blogs.length; i++){
      const totalLikes = blogs
        .filter(data => data.author === blogs[i].author)
        .map(data => data.likes)
        .reduce((acc, current) => {
          return (
            acc + current
          )
        },0)
      if(totalLikes > result.likes)
        result = ({ author: blogs[i].author, likes: totalLikes })
    }
    console.log(result)
    return result
  }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  getAuthorWithMostLikes
}
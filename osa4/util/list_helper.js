const keyWithHighestValue = (stats) => {
  let bestKey = null
  let bestValue = 0

  stats.forEach((value, key) => {
    if (value > bestValue) {
      bestKey = key
      bestValue = value
    }
  })

  return bestKey
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let getSum = (sum, i) => sum + i

  return blogs
    .map(b => b.likes)
    .reduce(getSum, 0)
}

const favoriteBlog = (blogs) => {
  let bestBlog = blogs[0]

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > bestBlog.likes) {
      bestBlog = blogs[i]
    }
  }

  return bestBlog
}

const mostBlogs = (blogs) => {
  let stats = new Map()

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author

    if (!stats.has(author)) stats.set(author, 0)

    let prev = stats.get(author)
    stats.set(author, prev + 1)
  }

  let bestAuthor = keyWithHighestValue(stats)

  return {
    author : bestAuthor,
    blogs : (bestAuthor ? stats.get(bestAuthor) : 0)
  }
}

const mostLikes = (blogs) => {
  let stats = new Map()

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author

    if (!stats.has(author)) stats.set(author, 0)

    let prev = stats.get(author)
    stats.set(author, prev + blogs[i].likes)
  }

  let bestAuthor = keyWithHighestValue(stats)

  return {
    author : bestAuthor,
    likes : (bestAuthor ? stats.get(bestAuthor) : 0)
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

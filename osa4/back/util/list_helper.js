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

module.exports = {
  dummy, totalLikes, favoriteBlog
}

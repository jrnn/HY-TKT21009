const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let getSum = (sum, i) => sum + i

  return blogs
    .map(b => b.likes)
    .reduce(getSum, 0)
}

module.exports = {
  dummy, totalLikes
}

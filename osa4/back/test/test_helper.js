const Blog = require("../model/blog")

const initialBlogs = [
  {
    title : "this is the water, and this is the well",
    author : "dougie coop",
    url : "https://tr00news.herokuapp.com/",
    likes : 13
  },
  {
    title : "Krabby patty appreciators",
    author : "Spengebeb Squrupunts",
    url : "https://tr00news.herokuapp.com/",
    likes : 42
  },
  {
    title : "Infinite Twin Peaks theories and speculation",
    author : "dougie coop",
    url : "https://tr00news.herokuapp.com/",
    likes : 31
  },
  {
    title : "Quadrupleroundhousekicking people in the face so hard they turn into doors",
    author : "Jackiechuck Channorris",
    url : "https://tr00news.herokuapp.com/",
    likes : 43
  }
]

const newBlogs = [
  {
    title : "facial hair appreciation and hifistely society",
    author : "Beardy McBeardface",
    url : "https://tr00news.herokuapp.com/",
    likes : 1337
  },
  {
    title : "everything there is to know about boats",
    author : "Boaty McBoatface",
    url : "https://tr00news.herokuapp.com/",
    likes : 666
  },
  {
    title : "tr00 He-Man fans worldwide unite",
    author : "Heman McHemanface",
    url : "https://tr00news.herokuapp.com/",
    likes : 42
  },
  {
    title : "the earth is BOTH flat AND a hollow sphere society",
    author : "Nutjob McNutjobface",
    url : "https://tr00news.herokuapp.com/",
    likes : 13
  }
]

const invalidBlogs = [
  {
    likes : 13
  },
  {
    title : "how NOT to post blogs",
    likes : 13
  },
  {
    author : "Evo-Peelo McPeelonen",
    likes : 13
  },
  {
    url : "https://tr00news.herokuapp.com/",
    likes : 13
  },
  {
    title : "how NOT to post blogs",
    author : "Evo-Peelo McPeelonen",
    likes : 13
  },
  {
    title : "how NOT to post blogs",
    url : "https://tr00news.herokuapp.com/",
    likes : 13
  },
  {
    author : "Evo-Peelo McPeelonen",
    url : "https://tr00news.herokuapp.com/",
    likes : 13
  }
]

const findAll = async () => {
  let blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

const getRandom = () => {
  let i = Math.floor(Math.random() * newBlogs.length)
  return newBlogs[i]
}

module.exports = {
  initialBlogs, invalidBlogs, findAll, getRandom
}

const Blog = require("../model/blog")
const User = require("../model/user")

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

const initialUsers = [
  {
    "username" : "hmchemul",
    "password" : "qwerty123",
    "name" : "Hemuli McHemuliface",
    "adult" : true
  },
  {
    "username" : "hmcheman",
    "password" : "qwerty123",
    "name" : "Heman McHemanface",
    "adult" : true
  }
]

const newUsers = [
  {
    "username" : "bmcbeard",
    "password" : "qwerty123",
    "name" : "Beardy McBeardface",
    "adult" : true
  },
  {
    "username" : "bmcspong",
    "password" : "qwerty123",
    "name" : "Bobby McSpongebobface",
    "adult" : false
  },
  {
    "username" : "gmcganda",
    "password" : "qwerty123",
    "name" : "Gandalf McGandalfface",
    "adult" : true
  }
]

const invalidUsers = [
  {
    "username" : "im",
    "name" : "In",
    "adult" : true
  },
  {
    "username" : "imcinval",
    "password" : "qw",
    "adult" : true
  },
  {
    "username" : "im",
    "password" : "qwerty123",
    "name" : "In",
    "adult" : true
  },
  {
    "password" : "qw",
    "name" : "Invalid McInvalidface",
    "adult" : true
  },
  {
    "username" : "imcinval",
    "password" : "qwerty123",
    "name" : "In",
    "adult" : true
  },
  {
    "username" : "imcinval",
    "password" : "qw",
    "name" : "Invalid McInvalidface",
    "adult" : true
  },
  {
    "password" : "qwerty123",
    "name" : "Invalid McInvalidface",
    "adult" : true
  }
]

const findAllBlogs = async () => {
  let blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

const getRandomBlog = () => {
  let i = Math.floor(Math.random() * newBlogs.length)
  return newBlogs[i]
}

const findAllUsers = async () => {
  let users = await User.find({})
  return users.map(User.format)
}

const getRandomUser = () => {
  let i = Math.floor(Math.random() * newUsers.length)
  return newUsers[i]
}

module.exports = {
  initialBlogs, invalidBlogs, findAllBlogs, getRandomBlog,
  initialUsers, invalidUsers, findAllUsers, getRandomUser
}

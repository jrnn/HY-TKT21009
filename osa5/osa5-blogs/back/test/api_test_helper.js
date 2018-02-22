const jwt = require("jsonwebtoken")
const Blog = require("../model/blog")
const User = require("../model/user")
const url = "https://tr00news.herokuapp.com/"

const initialBlogs = [
  {
    title : "100 hacks how to be stealthy in spandex",
    author : "Batman McBatmanface",
    url,
    likes : 313
  },
  {
    title : "Everything there is to know about boats",
    author : "Boaty McBoatface",
    url,
    likes : 13
  },
  {
    title : "Facial hair appreciation and hifistely society",
    author : "Beardy McBeardface",
    url,
    likes : 42
  },
  {
    title : "Fake news and conspiracy theories daily digest",
    author : "Tinfoilhatty McTinfoilhatface",
    url,
    likes : 31
  },
  {
    title : "Krabby Patty aficionados",
    author : "Spongebob McPantsface",
    url,
    likes : 666
  },
  {
    title : "Quadrupleroundhousekicking people in the face so hard they turn into doors",
    author : "Chuck McNorrisface",
    url,
    likes : 65536
  }
]

const newBlogs = [
  {
    title : "Ten best recipes how to cook your nephews on a budget",
    author : "Donald McDuckface",
    url,
    likes : 1337
  },
  {
    title : "My life : stamps, shrooms, butterflies, and cross-dressing",
    author : "Hemuli McHemuliface",
    url,
    likes : 4242
  },
  {
    title : "tr00 He-Man fanbois worldwide fanclub",
    author : "Heman McHemanface",
    url,
    likes : 1
  }
]

const invalidBlogs = [
  {
    likes : 13
  },
  {
    title : "Jonnen mopo ja ES blogi",
    likes : 13
  },
  {
    author : "Jonne McJonneface",
    likes : 13
  },
  {
    url,
    likes : 13
  },
  {
    title : "Jonnen mopo ja ES blogi",
    author : "Jonne McJonneface",
    likes : 13
  },
  {
    title : "Jonnen mopo ja ES blogi",
    url,
    likes : 13
  },
  {
    author : "Jonne McJonneface",
    url,
    likes : 13
  }
]

const initialUsers = [
  {
    username : "bmcbeard",
    name : "Beardy McBeardface",
    password : "qwerty123",
    pwHash : "$2a$10$xpASBPWmq8FXA4M7aFz4UupopI/6be8r7iatjgHwvV6JesnB3PYda"
  },
  {
    username : "cmcnorri",
    name : "Chuck McNorrisface",
    password : "qwerty123",
    pwHash : "$2a$10$yCrkNXLQVu9NNYJxjOi2Wedr1htyjtt6miHQs7UfaIvIRUlmbG3e."
  },
  {
    username : "smcpants",
    name : "Spongebob McPantsface",
    password : "qwerty123",
    pwHash : "$2a$10$5/hGnd6OvL3fxIjM1brxm.ZTQuxitAICwFRmLs778h/eTGaLznZTW"
  }
]

const newUsers = [
  {
    username : "bmcbatma",
    name : "Batman McBatmanface",
    password : "qwerty123",
    adult : true
  },
  {
    username : "bmcboatf",
    name : "Boaty McBoatface",
    password : "qwerty123",
    adult : false
  },
  {
    username : "hmcheman",
    name : "Heman McHemanface",
    password : "qwerty123",
    adult : true
  }
]

const invalidUsers = [
  {
    username : "jm",
    name : "Jo",
    adult : false
  },
  {
    username : "jmcjonne",
    password : "qw",
    adult : false
  },
  {
    username : "jm",
    name : "Jo",
    password : "qwerty123"
  },
  {
    name : "Jonne McJonneface",
    password : "qw",
    adult : false
  },
  {
    username : "jmcjonne",
    name : "Jo",
    password : "qwerty123"
  },
  {
    username : "jmcjonne",
    name : "Jonne McJonneface",
    password : "qw"
  },
  {
    name : "Jonne McJonneface",
    password : "qwerty123",
    adult : false
  }
]

const findOneBlog = async () => {
  let blogs = await Blog.find({})
  let i = Math.floor(Math.random() * blogs.length)
  return blogs[i]
}

const findOneUser = async () => {
  let users = await User.find({})
  let i = Math.floor(Math.random() * users.length)
  return users[i]
}

const findAllBlogs = async () => {
  let blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

const findAllUsers = async () => {
  let users = await User.find({})
  return users.map(User.format)
}

const getExistingBlog = () => {
  let i = Math.floor(Math.random() * initialBlogs.length)
  return initialBlogs[i]
}

const getExistingUser = () => {
  let i = Math.floor(Math.random() * initialUsers.length)
  return initialUsers[i]
}

const getNewBlog = () => {
  let i = Math.floor(Math.random() * newBlogs.length)
  return newBlogs[i]
}

const getNewUser = () => {
  let i = Math.floor(Math.random() * newUsers.length)
  return newUsers[i]
}

const createToken = (user) => {
  return jwt
    .sign({ id : user.id, username : user.username },
    process.env.SECRET)
}

const totalLikes = (blogs) => {
  let getSum = (sum, i) => sum + i

  return blogs
    .map(b => b.likes)
    .reduce(getSum, 0)
}

module.exports = {
  initialBlogs, invalidBlogs,
  initialUsers, invalidUsers,
  findOneBlog, findAllBlogs, getExistingBlog, getNewBlog,
  findOneUser, findAllUsers, getExistingUser, getNewUser,
  createToken, totalLikes
}

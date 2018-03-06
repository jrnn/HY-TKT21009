let token

const blogs = [
  {
    id : "5a75d36f7a31fc5f6865ff67",
    title : "Everything there is to know about boats",
    author : "Boaty McBoatface",
    url : "http://localhost:3001/api/blogs",
    likes : 313,
    user : {
      username : "hmcheman",
      name : "Heman McHemanface"
    }
  },
  {
    id : "5a75d4147a31fc5f6865ff68",
    title : "Krabby Patty appreciation society",
    author : "Spengebeb McSqurupunts",
    url : "http://localhost:3001/api/blogs",
    likes : 14,
    user : {
      username : "hmchemul",
      name : "Hemuli McHemuliface"
    }
  },
  {
    id : "5a75d49a7a31fc5f6865ff6a",
    title : "Quadrupleroundhousekicking people in the face so hard they turn into doors",
    author : "Jackiechuck McChannorris",
    url : "http://localhost:3001/api/blogs",
    likes : 1337,
    user : {
      username : "hmcheman",
      name : "Heman McHemanface"
    }
  },
  {
    id : "5a75d4e67a31fc5f6865ff6b",
    title : "He-man appreciation society for tr00 fanbois",
    author : "Heman McHemanface",
    url : "http://localhost:3001/api/blogs",
    likes : 65537,
    user : {
      username : "bmcbeard",
      name : "Beardy McBeardface"
    }
  }
]

const findAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = newToken
}

export default { blogs, findAll, setToken }

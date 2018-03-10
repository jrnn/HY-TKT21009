import axios from "axios"

const url = "/api/blogs"
let token = null

const setToken = (newToken) =>
  token = `bearer ${newToken}`

const findAll = async () => {
  let res = await axios.get(url)

  return res.data
}

const findOne = async (id) => {
  let res = await axios.get(url + `/${id}`)

  return res.data
}

const save = async (blog) => {
  let config = { headers : { "Authorization" : token } }
  let res = await axios.post(url, blog, config)

  return res.data
}

const saveComment = async (id, comment) => {
  await axios.post(url + `/${id}/comments`, { comment })
}

const update = async (blog) => {
  await axios.put(url + `/${blog.id}`, { likes : blog.likes })
}

const remove = async (id) => {
  let config = { headers : { "Authorization" : token } }
  await axios.delete(url + `/${id}`, config)
}

export default {
  findAll, findOne, remove, save, saveComment, setToken, update
}

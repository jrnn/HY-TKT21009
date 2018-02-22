import axios from "axios"
const url = "/api/blogs"
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const findAll = async () => {
  let res = await axios
    .get(url)

  return res.data
}

const findOne = async (id) => {
  let res = await axios
    .get(url + `/${id}`)

  return res.data
}

const save = async (blog) => {
  let config = { headers : { "Authorization" : token }}
  let res = await axios
    .post(url, blog, config)

  return res.data
}

export default { findAll, findOne, save, setToken }

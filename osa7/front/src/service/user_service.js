import axios from "axios"
const url = "/api/users"

const findAll = async () => {
  let res = await axios.get(url)

  return res.data
}

const findOne = async (id) => {
  let res = await axios.get(url + `/${id}`)

  return res.data
}

export default { findAll, findOne }

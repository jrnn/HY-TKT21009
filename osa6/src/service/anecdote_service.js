import axios from "axios"

const url = "http://localhost:3001/anecdotes"

const findAll = async () => {
  let res = await axios.get(url)
  return res.data
}

export default { findAll }

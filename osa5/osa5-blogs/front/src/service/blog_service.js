import axios from "axios"
const url = "/api/blogs"

const findAll = async () => {
  let res = await axios
    .get(url)

  return res.data
}

export default { findAll }

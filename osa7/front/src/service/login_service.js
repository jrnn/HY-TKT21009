import axios from "axios"
const url = "/api/login"

const login = async (creds) => {
  let res = await axios.post(url, creds)

  return res.data
}

export default { login }

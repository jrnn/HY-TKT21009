import axios from "axios"
const url = "http://localhost:3001/anecdotes"

const findAll = async () => {
  let res = await axios.get(url)
  return res.data
}

const saveOne = async (content) => {
  let anecdote = { content, votes : 0 }
  let res = await axios.post(url, anecdote)
  return res.data
}

const updateOne = async (anecdote) => {
  anecdote.votes = anecdote.votes + 1
  await axios.put(url + `/${anecdote.id}`, anecdote)
}

export default { findAll, saveOne, updateOne }

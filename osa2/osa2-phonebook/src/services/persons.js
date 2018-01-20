import Axios from 'axios'

const url = "http://localhost:3001/persons"

const validate = (name, number, persons) => {
  if (name === "" || number === "") {
    alert("Ei tyhjiä syötteitä!")
    return null
  }

  if (persons
    .map(p => p.name.toLowerCase())
    .includes(name.toLowerCase())) {
      alert("Voihan nenä! Nimi on jo käytössä!")
      return null
  }

  return { name, number }
}

const getAll = () => {
  let req = Axios.get(url)
  return req.then(res => res.data)
}

const add = (person) => {
  let req = Axios.post(url, person)
  return req.then(res => res.data)
}

export default { validate, getAll, add }

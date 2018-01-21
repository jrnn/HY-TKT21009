import Axios from 'axios'

const url = "http://localhost:3001/persons"

const validate = (name, number, persons) => {
  if (name === "" || number === "") { return null }

  persons = persons
    .filter(p => (p.name.toLowerCase() === name.toLowerCase()))

  if (persons.length > 0) {
    let person = {...persons[0], number : number }

    return window.confirm(person.name + " on jo luettelossa. Korvataanko vanha numero uudella?")
      ? person
      : null
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

const update = (id, person) => {
  let req = Axios.put(url + "/" + id, person)
  return req.then(res => res.data)
}

const remove = (id) => {
  let req = Axios.delete(url + "/" + id)
  return req.then(res => res)
}

export default { validate, getAll, add, update, remove }

import React from 'react'
import Form from './components/Form'
import Input from './components/Input'
import Persons from './components/Persons'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons : [],
      newName : "",
      newNumber : "",
      filter : ""
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => this.setState({ persons }))
  }

  addPerson = (e) => {
    e.preventDefault()

    let person = personService.validate(
      this.state.newName,
      this.state.newNumber,
      this.state.persons
    )

    if (person == null) { return }

    if (person.id == null) {
      personService
        .add(person)
        .then(newPerson => this.setState({
          persons : this.state.persons.concat(newPerson)
        }))
    } else {
      personService
        .update(person.id, person)
        .then(changedPerson => this.setState({
          persons : this.state.persons.map(p =>
            (p.id !== person.id ? p : changedPerson))
        }))
    }

    this.setState({
      newName : "",
      newNumber : ""
    })
  }

  deletePerson = (id) => {
    return () => {
      if (!window.confirm("Ooks ny ihan varma kans?")) { return }

      personService
        .remove(id)
        .then(res => {
          if (res.status === 200) this.setState({
            persons : this.state.persons.filter(p => (p.id !== id))
          })
        })
    }
  }

  handleNameChange = (e) => {
    this.setState({ newName : e.target.value })
  }

  handleNumberChange = (e) => {
    this.setState({ newNumber : e.target.value })
  }

  handleFilterChange = (e) => {
    this.setState({ filter : e.target.value })
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Input input={{
          label : "Rajaa näytettäviä:",
          value : this.state.filter,
          onChange : this.handleFilterChange,
          isTable : false
        }}
        />
        <h2>Lisää uusi</h2>
        <Form
          onSubmit={this.addPerson}
          inputs={[
            {
              label : "Nimi:",
              value : this.state.newName,
              onChange : this.handleNameChange,
              isTable : true
            },
            {
              label : "Numero:",
              value : this.state.newNumber,
              onChange : this.handleNumberChange,
              isTable : true
            }
          ]}
        />
        <h2>Numerot</h2>
        <Persons
          persons={this.state.persons}
          filter={this.state.filter}
          handleClick={this.deletePerson}
        />
      </div>
    )
  }
}

export default App

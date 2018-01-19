import React from 'react'
import Form from './components/Form'
import Input from './components/Input'
import Persons from './components/Persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons : props.persons,
      newName : "",
      newNumber : "",
      filter : ""
    }
  }

  addPerson = (e) => {
    e.preventDefault()

    if (this.state.newName === "" ||
        this.state.newNumber === "") { return }

    if (this.state.persons
      .map(p => p.name.toLowerCase())
      .includes(this.state.newName.toLowerCase())) {
        alert("Voihan nenä! Nimi on jo käytössä!")
        return
    }

    let person = {
      id : this.state.persons.length + 1,
      name : this.state.newName,
      number : this.state.newNumber
    }

    let persons = this.state.persons.concat(person)

    this.setState({
      persons,
      newName : "",
      newNumber : ""
    })
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
        />
      </div>
    )
  }
}

export default App

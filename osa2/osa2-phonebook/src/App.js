import React from 'react'
import Alert from './components/Alert'
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
      filter : "",
      alert : null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => this.setState({ persons }))
  }

  addPerson = (e) => {
    e.preventDefault()

    setTimeout(() => { this.setState({ alert : null })}, 5000)

    let person = personService.validate(
      this.state.newName,
      this.state.newNumber,
      this.state.persons
    )

    if (person == null) {
      this.setState({ alert : { msg : "Ei tyhjiä syötteitä!", type : "fail" }})
      return
    }

    if (person.id == null) {
      personService
        .add(person)
        .then(newPerson => this.setState({
          persons : this.state.persons.concat(newPerson),
          alert : { msg : "Henkilö lisätty puhelinluetteloon", type : "success" }
        }))
    }
    else {
      personService
        .update(person.id, person)
        .then(changedPerson => this.setState({
          persons : this.state.persons.map(p =>
            (p.id !== person.id ? p : changedPerson))
        }))
        .catch(ex => {
          this.setState({ persons : this.state.persons.filter(p => (p.id !== person.id))})
          person.id = null

          personService
            .add(person)
            .then(newPerson => this.setState({
              persons : this.state.persons.concat(newPerson)              
            }))
        })

        this.setState({ alert : { msg : "Henkilön tiedot päivitetty", type : "success" }})
    }

    this.setState({ newName : "", newNumber : "" })
  }

  deletePerson = (id) => {
    return () => {
      if (!window.confirm("Ooks ny ihan varma kans?")) { return }

      personService
        .remove(id)
        .then(res => this.setState({
          persons : this.state.persons.filter(p => (p.id !== id))
        }))
        .catch(ex => this.setState({
          persons : this.state.persons.filter(p => (p.id !== id))
        }))

      this.setState({ alert : { msg : "Henkilö poistettu puhelinluettelosta", type : "success" }})
      setTimeout(() => { this.setState({ alert : null })}, 5000)
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
        <section>
          <Alert alert={this.state.alert} />
          <h1>Puhelinluettelo</h1>
          <table>
            <tbody>
              <Input input={{
                label : "Rajaa näytettäviä:",
                value : this.state.filter,
                onChange : this.handleFilterChange
              }}
              />
            </tbody>
          </table>
        </section>
        <section>
          <h2>Lisää uusi</h2>
          <Form
            onSubmit={this.addPerson}
            inputs={[
              {
                label : "Nimi:",
                value : this.state.newName,
                onChange : this.handleNameChange
              },
              {
                label : "Numero:",
                value : this.state.newNumber,
                onChange : this.handleNumberChange
              }
            ]}
          />
        </section>
        <section>
          <h2>Numerot</h2>
          <Persons
            persons={this.state.persons}
            filter={this.state.filter}
            handleClick={this.deletePerson}
          />
        </section>
      </div>
    )
  }
}

export default App

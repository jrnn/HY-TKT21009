import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons : [
        { name : "Spengebeb Squrupunts" }
      ],
      newName : ""
    }
  }

  listPersons = () => {
    return (
      this.state.persons.map(p => <li key={p.name}>{p.name}</li>)
    )
  }

  addPerson = (e) => {
    e.preventDefault()

    if (this.state.persons
      .map(p => p.name)
      .includes(this.state.newName)) {
        alert("Voihan nenä! Nimi on jo varattu!")
        return
    }

    let person = { name : this.state.newName }
    let persons = this.state.persons.concat(person)

    this.setState({
      persons,
      newName : ""
    })
  }

  handleNameChange = (e) => {
    this.setState({ newName : e.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            Nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <input type="submit" value="Lisää" />
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.listPersons()}
        </ul>
      </div>
    )
  }
}

export default App

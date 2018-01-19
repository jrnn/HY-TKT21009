import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons : [
        {
          id : 1,
          name : "Spengebeb Squrupunts",
          number : "+1 42 666 1337"
        },
        {
          id : 2,
          name : "Chuck Norris",
          number : "none of your business"
        },
        {
          id : 3,
          name : "Spengebeb Chucknorris",
          number : "+358 40 123 4567"
        },
        {
          id : 4,
          name : "Spengebeb Nuckchorris",
          number : "N/A"
        }
      ],
      newName : "",
      newNumber : "",
      filter : ""
    }
  }

  listPersons = () => {
    let s = this.state.filter.toLowerCase()

    return (
      <table>
        <tbody>
          {this.state.persons
            .filter(p => p.name.toLowerCase().includes(s))
            .map(p =>
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.number}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  addPerson = (e) => {
    e.preventDefault()

    if (this.state.newName === "" ||
        this.state.newNumber === "") { return }

    if (this.state.persons
      .map(p => p.name.toLowerCase())
      .includes(this.state.newName.toLowerCase())) {
        alert("Voihan nenä! Nimi on jo varattu!")
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
        <div>
          Rajaa näytettäviä:
          <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </div>
        <h2>Lisää uusi</h2>
        <div>
          <form onSubmit={this.addPerson}>
            <table>
              <tbody>
                <tr>
                  <td>Nimi:</td>
                  <td>
                    <input
                      value={this.state.newName}
                      onChange={this.handleNameChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Numero:</td>
                  <td>
                    <input
                      value={this.state.newNumber}
                      onChange={this.handleNumberChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="submit" value="Lisää" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <h2>Numerot</h2>
        <div>
          {this.listPersons()}
        </div>
      </div>
    )
  }
}

export default App

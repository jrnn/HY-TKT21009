import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons : [
        {
          name : "Spengebeb Squrupunts",
          number : "+1 42 666 1337"
        },
        {
          name : "Chuck Norris",
          number : "none of your business"
        }
      ],
      newName : "",
      newNumber : ""
    }
  }

  listPersons = () => {
    return (
      <table>
        <tbody>
          {this.state.persons.map(p =>
            <tr key={p.name}>
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
      .map(p => p.name)
      .includes(this.state.newName)) {
        alert("Voihan nenä! Nimi on jo varattu!")
        return
    }

    let person = {
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

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
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
        <h2>Numerot</h2>
        <div>
          {this.listPersons()}
        </div>
      </div>
    )
  }
}

export default App

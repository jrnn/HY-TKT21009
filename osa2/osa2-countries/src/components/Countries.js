import React from 'react'
import CountryDetails from './CountryDetails'

class Countries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries : props.countries
    }
  }

  handleClick = (e) => {
    console.log("paska perse")
  }

  render() {
    if (this.state.countries.length > 10) {
      return (<p>Too many matches. Give a more specific search term.</p>)
    }

    if (this.state.countries.length > 1) {
      return (
        <ul>
          {this.state.countries.map(c =>
            <li key={c.name} onClick={this.handleClick}>
              {c.name}
            </li>)}
        </ul>
      )
    }

    if (this.state.countries.length === 1) {
      return (<CountryDetails country={this.state.countries[0]} />)
    }

    return (<p>No matching countries found!</p>)
  }
}

export default Countries

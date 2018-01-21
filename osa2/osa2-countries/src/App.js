import React from 'react'
import Axios from 'axios'
import Countries from './components/Countries'
import InputField from './components/InputField'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries : [],
      lookup : ""
    }
  }

  componentWillMount() {
    Axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => this.setState({ countries : res.data }))
  }

  handleCountryClick = (country) => {
    this.setState({ lookup : country })
  }

  handleSearchChange = (e) => {
    this.setState({ lookup : e.target.value })
  }

  render() {
    return (
      <div>
        <InputField
          label="Find countries:&nbsp;"
          value={this.state.lookup}
          onChange={this.handleSearchChange}
        />
        <Countries
          countries={
            this.state.countries
              .filter(c => c.name.toLowerCase()
                .includes(this.state.lookup.toLowerCase()))
          }
          onClick={this.handleCountryClick}
        />
      </div>
    )
  }
}

export default App

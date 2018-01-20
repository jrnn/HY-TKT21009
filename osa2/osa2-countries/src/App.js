import React from 'react'
import Axios from 'axios'
import CountryFilter from './components/CountryFilter'

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

  handleSearchChange = (e) => {
    this.setState({ lookup : e.target.value })
  }

  render() {
    return (
      <div>
        Find countries:&nbsp;
        <input
          value={this.state.lookup}
          onChange={this.handleSearchChange}
        />
        <CountryFilter
          countries={this.state.countries}
          lookup={this.state.lookup}
        />
      </div>
    )
  }
}

export default App

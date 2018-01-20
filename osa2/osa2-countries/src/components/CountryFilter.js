import React from 'react'
import CountryDetails from './CountryDetails'

const CountryFilter = ({ countries, lookup }) => {
  lookup = lookup.toLowerCase()
  countries = countries
    .filter(c => c.name.toLowerCase().includes(lookup))

  if (countries.length > 10) {
    return (<p>Too many matches. Give a more specific search term.</p>)
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(c => <li key={c.name}>{c.name}</li>)}
      </ul>
    )
  }

  if (countries.length === 1) {
    return (<CountryDetails country={countries[0]} />)
  }

  return (<p>No matching countries found!</p>)
}

export default CountryFilter

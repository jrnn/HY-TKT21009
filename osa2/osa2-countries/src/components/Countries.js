import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = ({ countries, onClick }) => {
  const listCountries = () => countries
    .map(country =>
      <Country
        key={country.name}
        country={country}
        onClick={onClick}
      />
  )

  if (countries.length > 10) {
    return (<p>Too many matches. Give a more specific search term.</p>)
  }

  if (countries.length > 1) {
    return (<ul>{listCountries()}</ul>)
  }

  if (countries.length === 1) {
    return (<CountryDetails country={countries[0]} />)
  }

  return (<p>No matching countries found!</p>)
}

export default Countries

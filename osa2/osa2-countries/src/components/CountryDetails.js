import React from 'react'

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name} ({country.nativeName})</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <img
        src={country.flag}
        alt="Flag"
        width="360">
      </img>
    </div>
  )
}

export default CountryDetails

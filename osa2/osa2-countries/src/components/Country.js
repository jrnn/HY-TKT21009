import React from 'react'

const Country = ({ country, onClick }) => {
  return (
    <li onClick={() => onClick(country.name)}>
      {country.name}
    </li>
  )
}

export default Country

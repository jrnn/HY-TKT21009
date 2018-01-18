import React from 'react'

const Osa = ({ osa }) => {
  return (
    <li>{osa.nimi} ({osa.tehtavia} tehtävää)</li>
  )
}

export default Osa

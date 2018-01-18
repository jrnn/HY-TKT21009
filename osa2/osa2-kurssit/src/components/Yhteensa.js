import React from 'react'

const Yhteensa = ({ kurssi }) => {
  const yhteensa = kurssi.osat
    .map(osa => osa.tehtavia)
    .reduce((acc, i) => acc + i)

  return (
    <p><strong>Yhteensä {yhteensa} tehtävää</strong></p>
  )
}

export default Yhteensa

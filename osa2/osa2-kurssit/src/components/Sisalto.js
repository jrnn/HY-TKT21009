import React from 'react'
import Osa from './Osa'

const Sisalto = ({ kurssi }) => {
  const osat = () => kurssi.osat.map(osa =>
    <Osa key={osa.id} osa={osa} />
  )

  return (
    <ul>
      {osat()}
    </ul>
  )
}

export default Sisalto

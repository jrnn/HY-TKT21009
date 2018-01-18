import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko otsikko={kurssi.nimi} />
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi} />
    </div>
  )
}

export default Kurssi

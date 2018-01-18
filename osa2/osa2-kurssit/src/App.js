import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({ data }) => {
  const kurssit = () => data.map(k =>
    <Kurssi key={k.id} kurssi={k} />
  )

  return (
    <div>
      <h1>Kurssitarjonta</h1>
      {kurssit()}
    </div>
  )
}

export default App

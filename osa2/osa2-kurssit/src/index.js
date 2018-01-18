import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const kurssi = {
    nimi : 'Half Stack -sovelluskehitys',
    osat : [
      {
        id : 1,
        nimi : 'Reactin perusteet',
        tehtavia : 10
      },
      {
        id : 2,
        nimi : 'Tiedonvälitys propseilla',
        tehtavia : 7
      },
      {
        id : 3,
        nimi : 'Komponenttien tila',
        tehtavia : 14
      },
      {
        id : 4,
        nimi : 'Komponenttien määrittely moduuleissa',
        tehtavia : 8
      }
    ]
  };

  return (
    <Kurssi kurssi={kurssi} />
  )
}

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko otsikko={kurssi.nimi} />
      <Sisalto kurssi={kurssi} />
    </div>
  )
}

const Otsikko = ({ otsikko }) => {
  return (
    <h1>{otsikko}</h1>
  )
}

const Sisalto = ({ kurssi }) => {
  const osat = () => kurssi.osat.map(osa =>
    <Osa key={osa.id} osa={osa} />
  )

  return (
    <div>
      {osat()}
    </div>
  )
}

const Osa = ({ osa }) => {
  return (
    <p>{osa.nimi} {osa.tehtavia}</p>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

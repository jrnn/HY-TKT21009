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
      },
      {
        id : 5,
        nimi : 'Taulukossa olevan datan renderöinti',
        tehtavia : 11
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
      <Yhteensa kurssi={kurssi} />
    </div>
  )
}

const Otsikko = ({ otsikko }) => {
  return (
    <h2>{otsikko}</h2>
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

const Yhteensa = ({ kurssi }) => {
  const yhteensa = kurssi.osat
    .map(osa => osa.tehtavia)
    .reduce((acc, i) => acc + i)

  return (
    <p><strong>Yhteensä {yhteensa} tehtävää</strong></p>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

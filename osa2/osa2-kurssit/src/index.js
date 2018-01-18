import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const data = [
  {
    id : 1,
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
  },
  {
    id : 2,
    nimi : 'Paritanssien ihmeellinen maailma',
    osat : [
      {
        id : 1,
        nimi : 'Valssi',
        tehtavia : 23
      },
      {
        id : 2,
        nimi : 'Tango',
        tehtavia : 17
      },
      {
        id : 3,
        nimi : 'Jenkka',
        tehtavia : 18
      },
      {
        id : 4,
        nimi : 'Boogie woogie',
        tehtavia : 13
      }
    ]
  }
]

ReactDOM.render(
  <App data={data}/>,
  document.getElementById('root')
);

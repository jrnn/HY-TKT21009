import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const persons = [
  {
    id : 1,
    name : "Spengebeb Squrupunts",
    number : "+1 42 666 1337"
  },
  {
    id : 2,
    name : "Chuck Norris",
    number : "none of your business"
  },
  {
    id : 3,
    name : "Spengebeb Chucknorris",
    number : "+358 40 123 4567"
  },
  {
    id : 4,
    name : "Spengebeb Nuckchorris",
    number : "N/A"
  }
]

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
);

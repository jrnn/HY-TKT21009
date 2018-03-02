import React from "react"
import ReactDOM from "react-dom"
import App from "./app"

const anecdotes = [
  {
    content : "If it hurts, do it more often",
    author : "Jez Humble",
    info : "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes : 0,
    id : "1"
  },
  {
    content : "Premature optimization is the root of all evil",
    author : "Donald Knuth",
    info : "http://wiki.c2.com/?PrematureOptimization",
    votes : 0,
    id : "2"
  },
  {
    content : "How do you spot a tr00 developer? Their Backbone is Angular.",
    author : "Spongebob Squarepants",
    info : "https://www.yle.fi/",
    votes : 0,
    id : "3"
  }
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById("root")
)

import React from "react"

const Anecdote = ({ anecdote, onClick }) => (
  <p>
    {anecdote.content}<br/>
    Has {anecdote.votes} votes
    <button onClick={onClick}>Vote</button>
  </p>
)

export default Anecdote

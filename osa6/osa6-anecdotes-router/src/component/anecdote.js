import React from "react"

const Anecdote = ({ anecdote, vote }) => (
  <div>
    <h2>"{anecdote.content}"</h2>
    <p>-- <em>{anecdote.author}</em></p>
    <p>
      Has {anecdote.votes} votes&nbsp;
      <button onClick={() => vote(anecdote.id)}>Vote</button>
    </p>
    <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

export default Anecdote

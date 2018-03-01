import React from "react"

class AnecdoteList extends React.Component {
  render() {
    let anecdotes = this.props.store.getState()

    const vote = (id) => {
      this.props.store.dispatch({
        type : "VOTE", id
      })
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(a =>
            <p key={a.id}>
              {a.content}<br/>
              Has {a.votes} votes
              <button
                onClick={() => vote(a.id)}>
                Vote
              </button>
            </p>
          )}
      </div>
    )
  }
}

export default AnecdoteList

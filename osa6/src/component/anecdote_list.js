import React from "react"
import { voteAnecdote } from "../reducer/anecdote_reducer"
import { setNotification, hideNotification } from "../reducer/notification_reducer"

class AnecdoteList extends React.Component {
  render() {
    let anecdotes = this.props.store.getState().anecdotes

    const vote = (anecdote) => {
      this.props.store.dispatch(voteAnecdote(anecdote.id))
      this.props.store.dispatch(setNotification(
        `You voted "${anecdote.content}"`
      ))
      setTimeout(() => {
        this.props.store.dispatch(hideNotification())
      }, 5000)
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a1, a2) => a2.votes - a1.votes)
          .map(anecdote =>
            <p key={anecdote.id}>
              {anecdote.content}<br/>
              Has {anecdote.votes} votes
              <button
                onClick={() => vote(anecdote)}>
                Vote
              </button>
            </p>
          )}
      </div>
    )
  }
}

export default AnecdoteList

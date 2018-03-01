import React from "react"
import Filter from "./filter"
import { voteAnecdote } from "../reducer/anecdote_reducer"
import { setNotification, hideNotification } from "../reducer/notification_reducer"

class AnecdoteList extends React.Component {
  render() {
    let store = this.props.store

    const getAnecdotes = () => {
      let filter = store.getState().filter

      return store.getState().anecdotes
        .filter(a => a.content.toLowerCase().includes(filter))
        .sort((a1, a2) => a2.votes - a1.votes)
    }

    const vote = (anecdote) => {
      store.dispatch(voteAnecdote(anecdote.id))
      store.dispatch(setNotification(
        `You voted "${anecdote.content}"`
      ))
      setTimeout(() => {
        store.dispatch(hideNotification())
      }, 5000)
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={store} />
        {getAnecdotes().map(anecdote =>
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

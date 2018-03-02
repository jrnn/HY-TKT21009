import React from "react"
import { connect } from "react-redux"

import Filter from "./filter"
import { voteAnecdote } from "../reducer/anecdote_reducer"
import { setNotification, hideNotification } from "../reducer/notification_reducer"

const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    <Filter />
    {props.listAnecdotes.map(a =>
      <p key={a.id}>
        {a.content}<br/>
        Has {a.votes} votes
        <button onClick={() => vote(a, props)}>Vote</button>
      </p>
    )}
  </div>
)

const listAnecdotes = (anecdotes, filter) => {
  return anecdotes
    .filter(a => a.content.toLowerCase().includes(filter))
    .sort((a1, a2) => a2.votes - a1.votes)
}

const vote = async (anecdote, props) => {
  props.voteAnecdote(anecdote)
  props.setNotification(`You voted "${anecdote.content}"`)
  setTimeout(() => {props.hideNotification()}, 5000)
}

const mapStateToProps = (state) => {
  return {
    listAnecdotes : listAnecdotes(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { setNotification, hideNotification, voteAnecdote }
)(AnecdoteList)

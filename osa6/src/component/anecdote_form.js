import React from "react"
import { connect } from "react-redux"

import { addAnecdote } from "../reducer/anecdote_reducer"
import { setNotification, hideNotification } from "../reducer/notification_reducer"

const AnecdoteForm = (props) => (
  <div>
    <h2>Add new</h2>
    <form onSubmit={e => addNew(e, props)}>
      <input
        type="text"
        name="content"
      />
      <button type="submit">Add</button>
    </form>
  </div>
)

const addNew = async (e, props) => {
  e.preventDefault()

  let content = e.target.content.value.trim()
  let notification = `Added new anecdote: "${content}"`

  if (content.length > 0) {
    e.target.content.value = ""
    props.addAnecdote(content)

    props.setNotification(notification)
    setTimeout(() => {props.hideNotification()}, 5000)
  }
}

export default connect(
  null,
  { addAnecdote, setNotification, hideNotification }
)(AnecdoteForm)

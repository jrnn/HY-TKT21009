import React from "react"
import { addAnecdote } from "../reducer/anecdote_reducer"
import { setNotification, hideNotification } from "../reducer/notification_reducer"

class AnecdoteForm extends React.Component {
  addNew = (e) => {
    e.preventDefault()

    let content = e.target.content.value
    let message = `Added new anecdote: "${content}"`

    if (content.length > 0) {
      this.props.store
        .dispatch(addAnecdote(content))
      this.props.store
        .dispatch(setNotification(message))
      setTimeout(() => {
        this.props.store.dispatch(hideNotification())
      }, 5000)

      e.target.content.value = ""
    }
  }

  render() {
    return (
      <div>
        <h2>Add new</h2>
        <form onSubmit={this.addNew}>
          <input
            type="text"
            name="content"
          />
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm

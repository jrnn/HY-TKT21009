import React from "react"
import { addAnecdote } from "../reducer/anecdote_reducer"
import { setNotification, hideNotification } from "../reducer/notification_reducer"

class AnecdoteForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { content : "" }
  }

  handleInput = (e) => {
    let content = e.target.value
    this.setState({ content })
  }

  addNew = (e) => {
    e.preventDefault()
    let content = this.state.content.trim()
    let message = `Added new anecdote: "${content}"`

    if (content.length > 0) {
      this.props.store
        .dispatch(addAnecdote(content))
      this.props.store
        .dispatch(setNotification(message))
      setTimeout(() => {
        this.props.store.dispatch(hideNotification())
      }, 5000)
      this.setState({ content : "" })
    }
  }

  render() {
    return (
      <div>
        <h2>Add new</h2>
        <form onSubmit={this.addNew}>
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleInput}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm

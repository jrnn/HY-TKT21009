import React from "react"
import Notification from "./component/notification"
import AnecdoteForm from "./component/anecdote_form"
import AnecdoteList from "./component/anecdote_list"

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList store={this.props.store} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App

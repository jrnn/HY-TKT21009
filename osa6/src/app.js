import React from "react"
import AnecdoteForm from "./component/anecdote_form"
import AnecdoteList from "./component/anecdote_list"
import Notification from "./component/notification"

class App extends React.Component {
  render() {
    let store = this.props.store

    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList store={store} />
        <AnecdoteForm />
      </div>
    )
  }
}

export default App

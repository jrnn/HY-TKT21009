import React from "react"
import AnecdoteForm from "./component/anecdote_form"
import AnecdoteList from "./component/anecdote_list"
import Notification from "./component/notification"

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default App

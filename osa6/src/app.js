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
        <Notification store={store} />
        <AnecdoteList store={store} />
        <AnecdoteForm store={store} />
      </div>
    )
  }
}

export default App

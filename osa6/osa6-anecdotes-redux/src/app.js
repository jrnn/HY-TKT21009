import React from "react"
import { connect } from "react-redux"

import AnecdoteForm from "./component/anecdote_form"
import AnecdoteList from "./component/anecdote_list"
import Notification from "./component/notification"
import { initAnecdotes } from "./reducer/anecdote_reducer"

class App extends React.Component {
  componentDidMount = async () => {
    this.props.initAnecdotes()
  }

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

export default connect(
  null,
  { initAnecdotes }
)(App)

import React from "react"
import { connect } from "react-redux"
import anecdoteService from "./service/anecdote_service"
import { initAnecdotes } from "./reducer/anecdote_reducer"
import AnecdoteForm from "./component/anecdote_form"
import AnecdoteList from "./component/anecdote_list"
import Notification from "./component/notification"

class App extends React.Component {
  componentDidMount = async () => {
    let anecdotes = await anecdoteService.findAll()
    this.props.initAnecdotes(anecdotes)
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

import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import Content from "./component/content"
import Footer from "./component/footer"
import Menu from "./component/menu"
import Notification from "./component/notification"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anecdotes : this.props.anecdotes,
      notification : null
    }
  }

  findById = (id) => this.state.anecdotes
    .find(a => a.id === id)

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 100000).toFixed(0)
    this.setState({
      anecdotes : this.state.anecdotes.concat(anecdote),
      notification : `Added new anecdote "${anecdote.content}"`
    })
    setTimeout(() => this.setState({
      notification : null
    }), 5000)
  }

  vote = (id) => {
    let anecdote = this.findById(id)
    anecdote.votes = anecdote.votes + 1

    let anecdotes = this.state.anecdotes
      .map(a => a.id === id ? anecdote : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Menu />
          {this.state.notification === null
            ? null
            : <Notification notification={this.state.notification} />}
          <Content
            addNew={this.addNew}
            anecdotes={this.state.anecdotes}
            findById={this.findById}
            vote={this.vote}
          />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App

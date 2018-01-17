import React from 'react'
import ReactDOM from 'react-dom'

class Anecdote {
  constructor(text) {
    this.text = text
    this.votes = 0
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected : 0,
      anecdotes : props.anecdotes
    }
  }

  randomAnecdote = () => {
    let rnd = Math.floor(Math.random() * anecdotes.length)
    this.setState({ selected : rnd })
  }

  upvote = () => {
    let anecdotes = this.state.anecdotes
    anecdotes[this.state.selected].votes++
    this.setState({ anecdotes : anecdotes })
  }

  render() {
    return (
      <div>
        <h2>Anecdote library</h2>
        <Display a={this.state.anecdotes[this.state.selected]} />
        <Button
          handleClick={this.upvote}
          text="Vote"
        />
        <Button
          handleClick={this.randomAnecdote}
          text="Keep 'em coming!"
        />
        <Leaderboard anecdotes={this.state.anecdotes} />
      </div>
    )
  }
}

const Display = ({ a }) => {
  return (
    <div>
      <h4>{a.text}</h4>
      <p>This anecdote has {a.votes} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <input type="button" onClick={handleClick} value={text} />
  )
}

const Leaderboard = ({ anecdotes }) => {
  let best = anecdotes[0]
  anecdotes.forEach(function(a, idx) {
    if (a.votes > best.votes) {
      best = a
    }
  })

  return (
    <div>
      <h4>Anecdote with most votes:</h4>
      <p>{best.text}</p>
    </div>
  )
}

const anecdotes = [
  new Anecdote("If it hurts, do it more often"),
  new Anecdote("Adding manpower to a late software project makes it later!"),
  new Anecdote("The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time."),
  new Anecdote("Any fool can write code that a computer can understand. Good programmers write code that humans can understand."),
  new Anecdote("Premature optimization is the root of all evil."),
  new Anecdote("Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."),
  new Anecdote("Everything is a dildo if you're brave enough.")
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

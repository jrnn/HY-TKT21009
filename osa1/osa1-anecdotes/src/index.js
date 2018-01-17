import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
  }

  randomAnecdote = () => {
    let i = Math.floor(Math.random() * anecdotes.length)
    this.setState({ selected : i })
  }

  render() {
    return (
      <div>
        <h4>{this.props.anecdotes[this.state.selected]}</h4>
        <Button
          handleClick={this.randomAnecdote}
          text="Keep 'em coming!"
        />
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => {
  return (
    <input type="button" onClick={handleClick} value={text} />
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'If you\'re brave enough, everything is a dildo.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

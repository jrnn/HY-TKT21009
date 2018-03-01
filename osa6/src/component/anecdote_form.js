import React from "react"

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

    if (content.length > 0) {
      this.props.store
        .dispatch({ type : "CREATE", content })
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

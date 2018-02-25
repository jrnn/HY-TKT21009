import React from "react"

class AddNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = { content : "" }
  }

  handleField = (e) => {
    this.setState({ content : e.target.value })
  }

  add = (e) => {
    e.preventDefault()

    let content = this.state.content.trim()
    if (content.length > 0) {
      this.props.store
        .dispatch({ type : "ADD_NEW", data : { content }})
      this.setState({ content : "" })
    }
  }

  render() {
    return (
      <form onSubmit={this.add}>
        <input
          type="text"
          value={this.state.content}
          onChange={this.handleField}
        />
        <button type="submit">Add</button>
      </form>
    )
  }
}

export default AddNew

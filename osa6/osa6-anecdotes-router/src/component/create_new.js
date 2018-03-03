import React from "react"
import { Button, Form } from "semantic-ui-react"

class CreateNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content : "",
      author : "",
      info : ""
    }
  }

  handleChange = (e) =>
    this.setState({ [e.target.name] : e.target.value })

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content : this.state.content,
      author : this.state.author,
      info : this.state.info,
      votes : 0
    })
    this.setState({ content : "", author : "", info : "" })
    this.props.history.push("/")
  }

  render() {
    return(
      <div>
        <h2>Add new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              type="text"
              name="content"
              placeholder="Content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="text"
              name="info"
              placeholder="URL for more info"
              value={this.state.info}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit">Add</Button>
        </Form>
      </div>
    )
  }
}

export default CreateNew

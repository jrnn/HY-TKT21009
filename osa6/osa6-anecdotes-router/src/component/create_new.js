import React from "react"

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
  }

  render() {
    return(
      <div>
        <h2>Add new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Content</td>
                <td>
                  <input
                    type="text"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Author</td>
                <td>
                  <input
                    type="text"
                    name="author"
                    value={this.state.author}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Url for more info</td>
                <td>
                  <input
                    type="text"
                    name="info"
                    value={this.state.info}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button>Add</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default CreateNew

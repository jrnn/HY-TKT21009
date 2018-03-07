import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import FormField from "./form_field"
import { addBlog, setNotification } from "../reducer/actions"

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title : "", author : "", url : "" }
  }
  static propTypes = {
    toggleForm : PropTypes.func.isRequired
  }

  getBlogFromState = () => {
    let { title, author, url } = this.state

    if (!title || title.length < 3) throw new Error()
    if (!author || author.length < 3) throw new Error()
    if (!url || url.length < 3) throw new Error()

    return { title, author, url }
  }

  handleFieldChange = (e) =>
    this.setState({ [e.target.name] : e.target.value })

  handleAdd = async (e) => {
    e.preventDefault()

    try {
      let blog = this.getBlogFromState()
      await this.props.addBlog(blog)

      this.setState({ title : "", author : "", url : "" })
      this.props.toggleForm()
      this.props.setNotification("New blog added. Hooray!", "success", 5)

    } catch (ex) {
      this.props.setNotification("Oops! Check your inputs.", "fail", 5)
    }
  }

  render () {
    return(
      <form onSubmit={this.handleAdd}>
        <table>
          <tbody>
            <FormField
              label="Title:"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
            <FormField
              label="Author:"
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
            <FormField
              label="URL:"
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
            <tr>
              <td>
                <button>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

export default connect(
  null,
  { addBlog, setNotification }
)(BlogForm)

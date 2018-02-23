import React from "react"

import blogService from "../service/blog_service"

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { details : false, key : 0 }
  }

  toggle = () => {
    this.setState({ details : !this.state.details })
  }

  like = async (e) => {
    e.preventDefault()

    this.props.blog.likes = this.props.blog.likes + 1
    await blogService.update(this.props.blog)
    this.setState({ key : Math.random() })
  }

  render() {
    let cursor = { cursor : "pointer" }
    let details = { display : this.state.details ? "" : "none" }
    let addedBy
    try {
      addedBy = this.props.blog.user.name
    } catch (ex) {
      addedBy = "anonymous"
    }

    return (
      <div className="blog-entry">
        <div onClick={this.toggle} style={cursor}>
          {this.props.blog.title} ({this.props.blog.author})
        </div>
        <div style={details}>
          <div className="blog-entry-details">
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
          </div>
          <div className="blog-entry-details">
            {this.props.blog.likes} likes&nbsp;
            <button type="submit" onClick={this.like}>Like</button>
          </div>
          <div className="blog-entry-details">added by {addedBy}</div>
          <div className="blog-entry-details">
            <button name={this.props.blog.id} onClick={this.props.handleRemove}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog

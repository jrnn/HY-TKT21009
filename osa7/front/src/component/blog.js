import React from "react"
import PropTypes from "prop-types"

import blogService from "../service/blog_service"

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { details : false, key : 0 }
  }
  static propTypes = {
    blog : PropTypes.object.isRequired,
    user : PropTypes.object.isRequired,
    handleRemove : PropTypes.func.isRequired
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
    let addedBy = this.props.blog.user.name

    const deleteButton = () => {
      let blogOwner = this.props.blog.user.username

      if (!blogOwner || blogOwner === this.props.user.username ) {
        return (
          <div className="blog-entry-details">
            <button name={this.props.blog.id} onClick={this.props.handleRemove}>
              Delete
            </button>
          </div>
        )
      }

      return(<div className="blog-entry-details"></div>)
    }

    return (
      <div className="blog-entry">
        <div onClick={this.toggle} style={cursor} className="tests-header">
          {this.props.blog.title} ({this.props.blog.author})
        </div>
        <div style={details} className="tests-details">
          <div className="blog-entry-details">
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
          </div>
          <div className="blog-entry-details">
            {this.props.blog.likes} likes&nbsp;
            <button type="submit" onClick={this.like}>Like</button>
          </div>
          <div className="blog-entry-details">
            added by {addedBy ? addedBy : "anonymous"}
          </div>
          {deleteButton()}
        </div>
      </div>
    )
  }
}

export default Blog

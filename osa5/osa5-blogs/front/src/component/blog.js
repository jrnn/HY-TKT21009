import React from "react"

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { details : false }
  }

  toggle = () => {
    this.setState({ details : !this.state.details })
  }

  render() {
    let cursor = { cursor : "pointer" }
    let details = { display : this.state.details ? "" : "none" }

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
            <button type="submit" className="button">Like</button>
          </div>
          <div className="blog-entry-details">added by {this.props.blog.user.name}</div>
        </div>
      </div>
    )
  }
}

export default Blog

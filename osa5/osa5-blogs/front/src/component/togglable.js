import React from "react"
import PropTypes from "prop-types"

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible : false }
  }
  static propTypes = {
    button : PropTypes.string.isRequired
  }

  toggle = () => {
    this.setState({ visible : !this.state.visible })
  }

  render() {
    let hide = { display : this.state.visible ? "none" : "" }
    let show = { display : this.state.visible ? "" : "none" }

    return(
      <div>
        <div style={hide}>
          <button onClick={this.toggle}>{this.props.button}</button>
        </div>
        <div style={show}>
          {this.props.children}
          <button onClick={this.toggle}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default Togglable

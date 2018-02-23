import React from "react"

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible : false }
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
          <button onClick={this.toggle} className="button">
            {this.props.button}
          </button>
        </div>
        <div style={show}>
          {this.props.children}
          <button onClick={this.toggle} className="button">
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default Togglable

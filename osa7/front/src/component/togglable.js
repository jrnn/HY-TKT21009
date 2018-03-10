import React from "react"
import { Button } from "semantic-ui-react"
import PropTypes from "prop-types"

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible : false }
  }
  static propTypes = {
    buttonLabel : PropTypes.string.isRequired
  }

  toggle = () => this.setState({ visible : !this.state.visible })

  render() {
    let hide = { display : this.state.visible ? "none" : "" }
    let show = { display : this.state.visible ? "" : "none" }

    return(
      <div>
        <div style={hide}>
          <Button
            content={this.props.buttonLabel}
            fluid
            onClick={this.toggle}
          />
        </div>
        <div style={show}>
          <Button
            content="Cancel"
            fluid
            onClick={this.toggle}
          />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Togglable

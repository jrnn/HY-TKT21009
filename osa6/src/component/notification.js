import React from "react"
import { connect } from "react-redux"

class Notification extends React.Component {
  render() {
    const style = {
      border : "solid",
      borderWidth : 1,
      padding : 10
    }

    const showNotification = (
      <div style={style}>
        {this.props.notification}
      </div>
    )

    return (
      <div>
        {this.props.notification === null
          ? null
          : showNotification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification : state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)

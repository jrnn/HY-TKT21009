import React from "react"
import { connect } from "react-redux"

const Notification = ({ notification }) => (
  <div>
    {notification === null
      ? null
      : showNotification(notification)}
  </div>
)

const style = {
  border : "solid",
  borderWidth : 1,
  padding : 10
}

const showNotification = (notification) => (
  <div style={style}>
    {notification}
  </div>
)

const mapStateToProps = (state) => {
  return {
    notification : state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)

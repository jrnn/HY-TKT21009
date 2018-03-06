import React from "react"
import { connect } from "react-redux"

const Notification = ({ notification }) => {
  if (!notification) {
    return (
      <div className="alert">&nbsp;</div>
    )
  }
  return (
    <div className={"alert " + notification.type}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = (state) => ({ notification : state.notification })

export default connect(
  mapStateToProps
)(Notification)

import React from "react"
import { connect } from "react-redux"
import { Message } from "semantic-ui-react"

const Notification = ({ notification }) => {
  if (!notification) return null

  if (notification.type === "fail") {
    return (
      <Message negative>
        <Message.Header>{notification.message}</Message.Header>
      </Message>
    )
  }
  return (
    <Message positive>
      <Message.Header>{notification.message}</Message.Header>
    </Message>
  )
}

const mapStateToProps = (state) => ({ notification : state.notification })

export default connect(
  mapStateToProps
)(Notification)

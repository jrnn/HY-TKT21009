import React from "react"
import { Message } from "semantic-ui-react"

const Notification = ({ notification })  => (
  <Message positive>
    <Message.Header>{notification}</Message.Header>
  </Message>
)

export default Notification

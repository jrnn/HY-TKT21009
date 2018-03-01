import React from "react"

class Notification extends React.Component {
  render() {
    const style = {
      border : "solid",
      borderWidth : 1,
      padding : 10
    }

    return (
      <div style={style}>
        render here notification...
      </div>
    )
  }
}

export default Notification

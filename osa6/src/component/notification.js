import React from "react"

class Notification extends React.Component {
  render() {
    let message = this.props.store.getState().notification

    const style = {
      border : "solid",
      borderWidth : 1,
      padding : 10
    }

    const notification = (
      <div style={style}>
        {message}
      </div>
    )

    return (
      <div>
        {message === null
          ? null
          : notification}
      </div>
    )
  }
}

export default Notification

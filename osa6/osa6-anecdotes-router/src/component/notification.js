import React from "react"

const style = {
  background : "#378563",
  color : "white",
  fontWeight : "bold",
  padding : 10
}

const Notification = ({ notification })  => (
  <div style={style}>
    {notification}
  </div>
)

export default Notification

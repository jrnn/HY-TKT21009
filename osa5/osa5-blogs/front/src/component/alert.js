import React from "react"

const Alert = ({ alert }) => {
  if ( !alert ) {
    return (
      <div className="alert">&nbsp;</div>
    )
  }

  return (
    <div className={"alert " + alert.type}>
      {alert.message}
    </div>
  )
}

export default Alert

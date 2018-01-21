import React from 'react'

const Alert = ({ alert }) => {
  if (alert == null) {
    return (
      <div className="alert">&nbsp;</div>
    )
  }

  return (
    <div className={"alert " + alert.type}>
      {alert.msg}
    </div>
  )
}

export default Alert

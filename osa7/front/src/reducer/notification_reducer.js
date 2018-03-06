const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION" : {
      return action.notification
    }
    case "HIDE_NOTIFICATION" : {
      return null
    }
    default : {
      return state
    }
  }
}

export const setNotification = (message, type, timeout) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch({
        type : "HIDE_NOTIFICATION"
      })
    }, (timeout * 1000))

    dispatch({
      type : "SET_NOTIFICATION",
      notification : { message, type }
    })
  }
}

export default notificationReducer

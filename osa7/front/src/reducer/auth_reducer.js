import blogService from "../service/blog_service"
import loginService from "../service/login_service"

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "CHECK_LOGIN" : {
      let user = window.localStorage.getItem("loggedBlogged")

      if (user) {
        user = JSON.parse(user)
        blogService.setToken(user.token)

        return user
      }

      return null
    }
    case "LOGIN_USER" : {
      blogService.setToken(action.user.token)
      window.localStorage
        .setItem("loggedBlogged", JSON.stringify(action.user))

      return action.user
    }
    case "LOGOUT_USER" : {
      blogService.setToken(null)
      window.localStorage.removeItem("loggedBlogged")

      return null
    }
    default : {
      return state
    }
  }
}

export const checkLoginStatus = () => ({ type : "CHECK_LOGIN" })

export const loginUser = (username, password) => {
  return async (dispatch) => {
    let user = await loginService
      .login({ username, password })

    dispatch({ type : "LOGIN_USER", user })
  }
}

export const logoutUser = () => ({ type : "LOGOUT_USER" })

export default authReducer

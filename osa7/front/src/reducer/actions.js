import blogService from "../service/blog_service"
import loginService from "../service/login_service"
import userService from "../service/user_service"

export const addBlog = (blog) => {
  return async (dispatch) => {
    blog = await blogService.save(blog)
    blog = await blogService.findOne(blog._id)

    dispatch({ type : "ADD_BLOG", blog })
  }
}

export const addUser = (user) => {
  return async (dispatch) => {
    user = await userService.save(user)
    user = await userService.findOne(user.id)

    dispatch({ type : "ADD_USER", user })
  }
}

export const checkAuth = () => ({ type : "CHECK_AUTH" })

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)

    dispatch({ type : "DELETE_BLOG", id })
  }
}

export const initState = () => {
  return async (dispatch) => {
    let blogs = await blogService.findAll()
    let users = await userService.findAll()

    dispatch({
      type : "INIT_STATE",
      init : { blogs, users }
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    blog.likes = blog.likes + 1
    await blogService.update(blog)

    dispatch({ type : "LIKE_BLOG", blog })
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    let user = await loginService
      .login({ username, password })

    dispatch({ type : "LOGIN_USER", user })
  }
}

export const logoutUser = () => ({ type : "LOGOUT_USER" })

export const setNotification = (message, type, timeout) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch({ type : "HIDE_NOTIFICATION" })
    }, (timeout * 1000))

    dispatch({
      type : "SET_NOTIFICATION",
      notification : { message, type }
    })
  }
}

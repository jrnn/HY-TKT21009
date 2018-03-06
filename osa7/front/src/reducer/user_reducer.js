import userService from "../service/user_service"

const sortByName = (u1, u2) => u1.name.localeCompare(u2.name)

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS" : {
      return action.users
        .sort(sortByName)
    }
    default : {
      return state
    }
  }
}

export const initUsers = () => {
  return async (dispatch) => {
    let users = await userService.findAll()

    dispatch({ type : "INIT_USERS", users })
  }
}

export default userReducer

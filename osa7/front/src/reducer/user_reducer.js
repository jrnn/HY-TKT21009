const sortByName = (u1, u2) => u1.name.localeCompare(u2.name)

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_STATE" : {
      return action.init.users
        .sort(sortByName)
    }
    case "LOGOUT_USER" : {
      return []
    }
    default : {
      return state
    }
  }
}

export default userReducer

const sortByLikes = (b1, b2) => (b2.likes - b1.likes)

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BLOG" : {
      return [ ...state, action.blog ]
        .sort(sortByLikes)
    }
    case "DELETE_BLOG" : {
      return state
        .filter(b => b.id !== action.id)
    }
    case "INIT_STATE" : {
      return action.init.blogs
        .sort(sortByLikes)
    }
    case "LOGOUT_USER" : {
      return []
    }
    case "REPLACE_BLOG" : {
      let blogs = state
        .filter(b => b.id !== action.blog.id)
      return [ ...blogs, action.blog ]
        .sort(sortByLikes)
    }
    default : {
      return state
    }
  }
}

export default blogReducer

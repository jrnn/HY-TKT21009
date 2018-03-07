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
    case "LIKE_BLOG" : {
      let blogs = state
        .filter(b => b.id !== action.blog.id)
      return [ ...blogs, action.blog ]
        .sort(sortByLikes)
    }
    case "LOGOUT_USER" : {
      return []
    }
    default : {
      return state
    }
  }
}

export default blogReducer

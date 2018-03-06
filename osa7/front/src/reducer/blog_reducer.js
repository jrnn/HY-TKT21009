import blogService from "../service/blog_service"

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
    case "INIT_BLOGS" : {
      return action.blogs
        .sort(sortByLikes)
    }
    case "LIKE_BLOG" : {
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

export const addBlog = (blog) => {
  return async (dispatch) => {
    blog = await blogService.save(blog)
    blog = await blogService.findOne(blog._id)

    dispatch({ type : "ADD_BLOG", blog })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)

    dispatch({ type : "DELETE_BLOG", id })
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogService.findAll()

    dispatch({ type : "INIT_BLOGS", blogs })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    blog.likes = blog.likes + 1
    await blogService.update(blog)

    dispatch({ type : "LIKE_BLOG", blog })
  }
}

export default blogReducer

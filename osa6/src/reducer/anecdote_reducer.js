import anecdoteService from "../service/anecdote_service"

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ANECDOTE" : {
      return [ ...state, action.data.anecdote ]
    }
    case "INIT_ANECDOTES" : {
      return action.data.anecdotes
    }
    default : {
      return state
    }
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type : "ADD_ANECDOTE",
    data : { anecdote }
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    let anecdotes = await anecdoteService.findAll()
    dispatch({
      type : "INIT_ANECDOTES",
      data : { anecdotes }
    })
  }
}

export default anecdoteReducer

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

export const initAnecdotes = (anecdotes) => {
  return {
    type : "INIT_ANECDOTES",
    data : { anecdotes }
  }
}

export default anecdoteReducer

const asObject = (content) => {
  return {
    id : (1000000 * Math.random()).toFixed(0),
    content,
    votes : 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE_ANECDOTE" : {
      let id = action.data.id
      let old = state.filter(a => a.id !== id)
      let voted = state.find(a => a.id === id)

      return [ ...old, { ...voted, votes : voted.votes + 1 } ]
    }
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

export const voteAnecdote = (id) => {
  return {
    type : "VOTE_ANECDOTE",
    data : { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type : "ADD_ANECDOTE",
    data : { anecdote : asObject(content) }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type : "INIT_ANECDOTES",
    data : { anecdotes }
  }
}

export default anecdoteReducer

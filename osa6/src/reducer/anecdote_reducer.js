import anecdoteService from "../service/anecdote_service"

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE_ANECDOTE" : {
      let voted = action.data.anecdote
      let other = state.filter(a => a.id !== voted.id)
      return [ ...other, voted ]
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

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes = anecdote.votes + 1
    await anecdoteService.updateOne(anecdote)

    dispatch({
      type : "VOTE_ANECDOTE",
      data : { anecdote }
    })
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    let anecdote = await anecdoteService.saveOne(content)

    dispatch({
      type : "ADD_ANECDOTE",
      data : { anecdote }
    })
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

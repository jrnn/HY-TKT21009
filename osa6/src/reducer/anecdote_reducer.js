const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]

const asObject = (anecdote) => {
  return {
    id : (1000000 * Math.random()).toFixed(0),
    content : anecdote,
    votes : 0
  }
}

const initState = anecdotes.map(asObject)

const anecdoteReducer = (state = initState, action) => {
  switch (action.type) {
    case "VOTE" : {
      let old = state.filter(a => a.id !== action.id)
      let voted = state.find(a => a.id === action.id)

      return [ ...old, { ...voted, votes : voted.votes + 1 } ]
    }
    case "CREATE" : {
      return [ ...state, asObject(action.content) ]
    }
    default : {
      return state
    }
  }
}

export default anecdoteReducer

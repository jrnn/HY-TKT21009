let anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "What doesn't kill you, hurts like hell.",
  "A soldier without a pen is like a hooker without a penis."
]

const asObject = (anecdote) => {
  return {
    id : (Math.random() * 1000000).toFixed(0),
    content : anecdote,
    votes : Math.floor(Math.random() * 20)
  }
}

const sortByVotes = (a1, a2) => {
  return (a2.votes - a1.votes)
}

const initState = anecdotes
  .map(asObject)
  .sort(sortByVotes)

const anecdoteReducer = (state = initState, action) => {
  switch (action.type) {
    case "VOTE" :
      let id = action.data.id
      let votedAnecdote = state.find(a => a.id === id)
      votedAnecdote = { ...votedAnecdote, votes : votedAnecdote.votes + 1 }

      return state
        .map(a => a.id !== id
          ? a
          : votedAnecdote
        ).sort(sortByVotes)

    default :
      return state
  }
}

export default anecdoteReducer

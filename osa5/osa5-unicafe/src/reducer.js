const initState = {
  good : 0,
  okay : 0,
  bad : 0
}

const unicafeReducer = (state = initState, action) => {
  switch (action.type) {
    case "GOOD" :
      return { ...state, good : state.good + 1 }

    case "OKAY" :
      return { ...state, okay : state.okay + 1 }

    case "BAD" :
      return { ...state, bad : state.bad + 1 }

    case "RESET" :
      return initState

    default :
      return state
  }
}

export default unicafeReducer

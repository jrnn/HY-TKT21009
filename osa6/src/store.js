import { createStore } from "redux"
import anecdoteReducer from "./reducer/anecdote_reducer"

const store = createStore(anecdoteReducer)

export default store

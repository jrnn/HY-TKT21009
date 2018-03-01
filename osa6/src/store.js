import { createStore, combineReducers } from "redux"
import anecdoteReducer from "./reducer/anecdote_reducer"
import notificationReducer from "./reducer/notification_reducer"

const reducer = combineReducers({
  anecdotes : anecdoteReducer,
  notification : notificationReducer
})

const store = createStore(reducer)

export default store

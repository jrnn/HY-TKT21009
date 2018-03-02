import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux"
import thunk from "redux-thunk"

import anecdoteReducer from "./reducer/anecdote_reducer"
import filterReducer from "./reducer/filter_reducer"
import notificationReducer from "./reducer/notification_reducer"

const reducer = combineReducers({
  anecdotes : anecdoteReducer,
  filter : filterReducer,
  notification : notificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store

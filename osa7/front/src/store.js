import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux"
import thunk from "redux-thunk"

import notificationReducer from "./reducer/notification_reducer"

const reducer = combineReducers({
  notification : notificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store

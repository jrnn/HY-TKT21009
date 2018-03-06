import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux"
import thunk from "redux-thunk"

import blogReducer from "./reducer/blog_reducer"
import notificationReducer from "./reducer/notification_reducer"

const reducer = combineReducers({
  blogs : blogReducer,
  notification : notificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store

import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux"
import thunk from "redux-thunk"

import authReducer from "./reducer/auth_reducer"
import blogReducer from "./reducer/blog_reducer"
import notificationReducer from "./reducer/notification_reducer"
import userReducer from "./reducer/user_reducer"

const reducer = combineReducers({
  blogs : blogReducer,
  notification : notificationReducer,
  user : authReducer,
  users : userReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store

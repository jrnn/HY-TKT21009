import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import BlogDetails from "./blog_details"
import BlogList from "./blog_list"
import UserDetails from "./user_details"
import UserList from "./user_list"

const ContentRouter = () => (
  <Router>
    <div>
      <Route
        exact path="/"
        render={() => <BlogList />}
      />
      <Route
        exact path="/blogs/:id"
        render={({ history, match }) =>
          <BlogDetails
            history={history}
            id={match.params.id}
          />
        }
      />
      <Route
        exact path="/users"
        render={() => <UserList />}
      />
      <Route
        exact path="/users/:id"
        render={({ match }) =>
          <UserDetails
            id={match.params.id}
          />
        }
      />
    </div>
  </Router>
)

export default ContentRouter

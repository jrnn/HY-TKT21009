import React from "react"
import { Route } from "react-router-dom"

import BlogList from "./blog_list"
import UserDetails from "./user_container"
import UserList from "./user_list"

const Content = () => (
  <div>
    <Route
      exact path="/"
      render={() => <BlogList />}
    />
    <Route
      exact path="/users"
      render={() => <UserList />}
    />
    <Route
      exact path="/users/:id"
      render={({ match }) =>
        <UserDetails id={match.params.id} />
      }
    />
  </div>
)

export default Content

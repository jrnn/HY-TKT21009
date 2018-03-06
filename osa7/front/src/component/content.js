import React from "react"
import { Route } from "react-router-dom"

import BlogList from "./blog_list"
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
  </div>
)

export default Content

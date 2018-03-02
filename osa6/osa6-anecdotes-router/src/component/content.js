import React from "react"
import { Route } from "react-router-dom"

import About from "./about"
import AnecdoteList from "./anecdote_list"
import CreateNew from "./create_new"

const Content = ({ anecdotes, addNew }) => (
  <div>
    <Route
      exact path="/"
      render={() => <AnecdoteList anecdotes={anecdotes} />}
    />
    <Route
      exact path="/create"
      render={() => <CreateNew addNew={addNew} />}
    />
    <Route
      exact path="/about"
      render={() => <About />}
    />
  </div>
)

export default Content

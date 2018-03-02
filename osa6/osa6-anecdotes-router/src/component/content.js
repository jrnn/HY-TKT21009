import React from "react"
import { Route } from "react-router-dom"

import About from "./about"
import Anecdote from "./anecdote"
import AnecdoteList from "./anecdote_list"
import CreateNew from "./create_new"

const Content = ({ addNew, anecdotes, findById, vote }) => (
  <div>
    <Route
      exact path="/"
      render={() => <AnecdoteList anecdotes={anecdotes} />}
    />
    <Route
      exact path="/anecdotes/:id"
      render={({match}) =>
        <Anecdote
          anecdote={findById(match.params.id)}
          vote={vote}
        />
      }
    />
    <Route
      exact path="/create"
      render={({history}) =>
        <CreateNew
          history={history}
          addNew={addNew}
        />
      }
    />
    <Route
      exact path="/about"
      render={() => <About />}
    />
  </div>
)

export default Content

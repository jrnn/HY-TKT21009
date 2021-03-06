import React from 'react'

import AddNew from "./component/add_new"
import Anecdote from "./component/anecdote"
import Title from "./component/title"

class App extends React.Component {
  render() {
    const state = this.props.store.getState()

    const anecdotes = () => (
      <div>
        {state.map(a =>
          <Anecdote
            key={a.id}
            anecdote={a}
            onClick={e => this.props.store.dispatch(
              { type : "VOTE", data : { id : a.id }}
            )}
          />
        )}
      </div>
    )

    return (
      <div>
        <Title title="Anecdotes" />
        {anecdotes()}
        <Title title="Add new" />
        <AddNew store={this.props.store} />
      </div>
    )
  }
}

export default App

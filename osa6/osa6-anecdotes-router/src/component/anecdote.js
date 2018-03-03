import React from "react"
import { Button, Segment } from "semantic-ui-react"

const Anecdote = ({ anecdote, vote }) => (
  <Segment.Group>
    <Segment>
      <h2>"{anecdote.content}"</h2>
      <em>-- {anecdote.author}</em>
    </Segment>
    <Segment>
      <p>
        Has {anecdote.votes} votes&nbsp;
        <Button onClick={() => vote(anecdote.id)}>Vote</Button>
      </p>
      <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </Segment>
  </Segment.Group>
)

export default Anecdote

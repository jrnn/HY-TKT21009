import React from "react"
import { Link } from "react-router-dom"
import { Table } from "semantic-ui-react"

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table singleLine>
      <Table.Body>
        {anecdotes.map(a =>
          <Table.Row key={a.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

export default AnecdoteList

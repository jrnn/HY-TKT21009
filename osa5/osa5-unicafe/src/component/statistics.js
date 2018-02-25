import React from "react"
import Button from "./button"

class Statistics extends React.Component {
  render() {
    const state = this.props.store.getState()
    const votesCount = state.good + state.okay + state.bad
    const goodShare = Math.round((100 * state.good / votesCount) * 100) / 100

    const stats = () => (
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>Okay</td>
            <td>{state.okay}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>Share of 'good'</td>
            <td>{goodShare} %</td>
          </tr>
        </tbody>
      </table>
    )

    return (
      <div>
        {votesCount > 0
          ? stats()
          : <p>(No votes have been cast yet!)</p>
        }
        <Button
          label="Reset stats"
          onClick={e => this.props.store.dispatch({ type : "RESET" })}
        />
      </div>
    )
  }
}

export default Statistics

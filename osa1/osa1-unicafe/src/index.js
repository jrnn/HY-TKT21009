import React from 'react'
import ReactDOM from 'react-dom'

const Title = ({ title }) => {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <input type="button" onClick={handleClick} value={text} />
  )
}

const Statistic = ({ stat, value }) => {
  return (
    <tr>
      <td>{stat}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ hyv, neu, huo }) => {
  let ttl = hyv + neu + huo

  if (ttl === 0) {
    return (
      <div>
        <p>(Erhmagerd! Yhtään palautetta ei ole annettu!)</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic stat="Hyvä" value={hyv} />
          <Statistic stat="Neutraali" value={neu} />
          <Statistic stat="Huono" value={huo} />
          <Statistic stat="Keskiarvo" value={(hyv - huo) / ttl} />
          <Statistic stat="Positiivisia" value={(100 * hyv / ttl) + "%"} />
        </tbody>
      </table>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback : [0, 0, 0] // [0] = hyva ; [1] = neutraali ; [2] = huono
    }
  }

  incrementFeedback = (index) => {
    return () => {
      let feedback = this.state.feedback.slice()
      feedback[index]++
      this.setState({ feedback : feedback })
    }
  }

  render() {
    return (
      <div>
        <Title title="Unicafe | Anna palautetta" />
        <Button
          handleClick={this.incrementFeedback(0)}
          text="Hyvä"
        />
        <Button
          handleClick={this.incrementFeedback(1)}
          text="Neutraali"
        />
        <Button
          handleClick={this.incrementFeedback(2)}
          text="Huono"
        />
        <Title title="Statistiikka" />
        <Statistics
          hyv={this.state.feedback[0]}
          neu={this.state.feedback[1]}
          huo={this.state.feedback[2]}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

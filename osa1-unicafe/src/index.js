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
    <div>
      <li>{stat} : {value}</li>
    </div>
  )
}

const Statistics = ({ feedback }) => {
  let hyv = feedback[0]
  let neu = feedback[1]
  let huo = feedback[2]
  let ttl = hyv + neu + huo

  if (ttl === 0) {
    return (
      <div>
        <p>(Erhmagerd! Yhtään palautetta ei ole annettu!)</p>
      </div>
    )
  }

  let avg = (hyv - huo) / ttl
  let pos = 100 * hyv / ttl

  return (
    <div>
      <ul>
        <Statistic stat="Hyvä" value={hyv} />
        <Statistic stat="Neutraali" value={neu} />
        <Statistic stat="Huono" value={huo} />
        <Statistic stat="Keskiarvo" value={avg} />
        <Statistic stat="Positiivisia" value={pos + "%"} />
      </ul>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // tallenna palautteet taulukkoon seuraavasti
      // [0] = hyva ; [1] = neutraali ; [2] = huono
      feedback : [0, 0, 0]
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
        <Statistics feedback={this.state.feedback} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

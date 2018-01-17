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

const Statistics = ({ hyva, neutraali, huono }) => {
  const avg = (hyva - huono) / (hyva + neutraali + huono)
  const pos = 100 * (hyva / (hyva + neutraali + huono))

  return (
    <div>
      <ul>
        <Statistic stat="Hyvä" value={hyva} />
        <Statistic stat="Neutraali" value={neutraali} />
        <Statistic stat="Huono" value={huono} />
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
      hyva : 0,
      neutraali : 0,
      huono : 0
    }
  }

  clickHyva = () => {
    this.setState({
      hyva : this.state.hyva + 1
    })
  }

  clickNeutraali = () => {
    this.setState({
      neutraali : this.state.neutraali + 1
    })
  }

  clickHuono = () => {
    this.setState({
      huono : this.state.huono + 1
    })
  }

  render() {
    return (
      <div>
        <Title title="Unicafe | Anna palautetta" />
        <Button
          handleClick={this.clickHyva}
          text="Hyvä"
        />
        <Button
          handleClick={this.clickNeutraali}
          text="Neutraali"
        />
        <Button
          handleClick={this.clickHuono}
          text="Huono"
        />
        <Title title="Statistiikka" />
        <Statistics
          hyva={this.state.hyva}
          neutraali={this.state.neutraali}
          huono={this.state.huono}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

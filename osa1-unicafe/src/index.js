import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div>
      <h3>{props.otsikko}</h3>
    </div>
  )
}

const Nappi = ({ handleClick, teksti }) => {
  return (
    <input type="button" onClick={handleClick} value={teksti} />
  )
}

const Tilasto = ({ hyva, neutraali, huono }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Hyvä:</td>
            <td>{hyva}</td>
          </tr>
          <tr>
            <td>Neutraali:</td>
            <td>{neutraali}</td>
          </tr>
          <tr>
            <td>Huono:</td>
            <td>{huono}</td>
          </tr>
        </tbody>
      </table>
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
        <Otsikko otsikko="Unicafe | Anna palautetta" />
        <Nappi
          handleClick={this.clickHyva}
          teksti="Hyvä"
        />
        <Nappi
          handleClick={this.clickNeutraali}
          teksti="Neutraali"
        />
        <Nappi
          handleClick={this.clickHuono}
          teksti="Huono"
        />
        <Otsikko otsikko="Statistiikka" />
        <Tilasto
          hyva={this.state.hyva}
          neutraali={this.state.neutraali}
          huono={this.state.huono}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

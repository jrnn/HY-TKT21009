import React from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import Content from "./component/content"
import LoginForm from "./component/login_form"
import Notification from "./component/notification"
import { initState } from "./reducer/actions"

class App extends React.Component {
  componentDidMount = () => this.props.initState()

  render() {
    return (
      <Router>
        <div>
          <Notification />
          {this.props.auth === null
            ? <LoginForm />
            : <Content />
          }
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({ auth : state.auth })

export default connect(
  mapStateToProps,
  { initState }
)(App)

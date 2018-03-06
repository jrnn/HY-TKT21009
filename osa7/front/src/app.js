import React from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import Content from "./component/content"
import LoginForm from "./component/login_form"
import Notification from "./component/notification"
import { checkLoginStatus } from "./reducer/auth_reducer"

class App extends React.Component {
  componentDidMount = () => this.props.checkLoginStatus()

  render() {
    return (
      <Router>
        <div>
          <Notification />
          {this.props.user === null
            ? <LoginForm />
            : <Content />
          }
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({ user : state.user })

export default connect(
  mapStateToProps,
  { checkLoginStatus }
)(App)

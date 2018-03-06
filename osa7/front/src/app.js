import React from "react"
import { connect } from "react-redux"

import BlogList from "./component/blog_list"
import LoginForm from "./component/login_form"
import Notification from "./component/notification"
import { checkLoginStatus } from "./reducer/auth_reducer"

class App extends React.Component {
  componentDidMount = () => this.props.checkLoginStatus()

  render() {
    return (
      <div>
        <Notification />
        {this.props.user === null
          ? <LoginForm />
          : <BlogList />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ user : state.user })

export default connect(
  mapStateToProps,
  { checkLoginStatus }
)(App)

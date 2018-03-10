import React from "react"
import { connect } from "react-redux"
import { Container } from "semantic-ui-react"

import ContentContainer from "./component/content_container"
import LoginForm from "./component/login_form"
import Notification from "./component/notification"
import { checkAuth } from "./reducer/actions"

class App extends React.Component {
  componentDidMount = () => this.props.checkAuth()

  render() {
    return (
      <Container className="padded">
        <Notification />
        {this.props.auth === null
          ? <LoginForm />
          : <ContentContainer />
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({ auth : state.auth })

export default connect(
  mapStateToProps,
  { checkAuth }
)(App)

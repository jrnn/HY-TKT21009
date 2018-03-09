import React from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import ContentRouter from "./content_router"
import NavBar from "./navbar"
import { initState } from "../reducer/actions"

class ContentContainer extends React.Component {
  componentDidMount = () => this.props.initState()

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <ContentRouter />
        </div>
      </Router>
    )
  }
}

export default connect(
  null,
  { initState }
)(ContentContainer)

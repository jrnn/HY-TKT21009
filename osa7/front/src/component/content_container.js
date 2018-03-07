import React from "react"
import { connect } from "react-redux"

import ContentRouter from "./content_router"
import { initState } from "../reducer/actions"

class ContentContainer extends React.Component {
  componentDidMount = () => this.props.initState()

  render = () => (<ContentRouter />)
}

export default connect(
  null,
  { initState }
)(ContentContainer)

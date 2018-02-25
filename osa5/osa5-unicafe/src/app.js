import React from "react"

import FeedbackControls from "./component/feedback_controls"
import Statistics from "./component/statistics"
import Title from "./component/title"

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Title title="Unicafe | Give feedback" />
          <FeedbackControls store={this.props.store} />
        </div>
        <div>
          <Title title="Statistics" />
          <Statistics store={this.props.store} />
        </div>
      </div>
    )
  }
}

export default App

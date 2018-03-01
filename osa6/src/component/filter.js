import React from "react"
import { setFilter } from "../reducer/filter_reducer"

class Filter extends React.Component {
  handle = (e) => {
    let filter = e.target.value
    this.props.store.dispatch(setFilter(filter))
  }

  render() {
    return (
      <div>
        Filter&nbsp;
        <input
          type="text"
          onChange={this.handle}
        />
      </div>
    )
  }
}

export default Filter

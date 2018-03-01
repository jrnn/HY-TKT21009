import React from "react"
import { connect } from "react-redux"
import { setFilter } from "../reducer/filter_reducer"

const Filter = (props) => (
  <div>
    Filter&nbsp;
    <input
      type="text"
      onChange={e => props.setFilter(e.target.value)}
    />
  </div>
)

export default connect(
  null,
  { setFilter }
)(Filter)

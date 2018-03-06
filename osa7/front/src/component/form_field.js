import React from "react"
import PropTypes from "prop-types"

const FormField = (props) => (
  <tr>
    <td>{props.label}</td>
    <td>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </td>
  </tr>
)

FormField.propTypes = {
  label : PropTypes.string.isRequired,
  name : PropTypes.string.isRequired,
  onChange : PropTypes.func.isRequired,
  type : PropTypes.string.isRequired,
  value : PropTypes.string.isRequired
}

export default FormField

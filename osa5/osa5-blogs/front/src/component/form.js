import React from "react"
import PropTypes from "prop-types"

const Form = ({ handleSubmit, handleField, fields, submit }) => (
  <form onSubmit={handleSubmit}>
    <table>
      <tbody>
        {fields.map(field =>
          <tr key={field.name}>
            <td>{field.name}</td>
            <td>
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handleField}
              />
            </td>
          </tr>
        )}
        <tr>
          <td>
            <button type="submit">{submit}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
)

Form.propTypes = {
  handleSubmit : PropTypes.func.isRequired,
  handleField : PropTypes.func.isRequired,
  fields : PropTypes.array.isRequired,
  submit : PropTypes.string.isRequired
}

export default Form

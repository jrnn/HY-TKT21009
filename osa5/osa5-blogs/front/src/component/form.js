import React from "react"

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

export default Form

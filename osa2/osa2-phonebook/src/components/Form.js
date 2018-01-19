import React from 'react'
import Input from './Input'

const Form = ({ onSubmit, inputs }) => {
  const renderInputs = () => inputs
    .map(i => <Input key={i.label} input={i} />)

  return (
    <form onSubmit={onSubmit}>
      <table>
        <tbody>
          {renderInputs()}
          <tr>
            <td>
              <input type="submit" value="Lisää" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default Form

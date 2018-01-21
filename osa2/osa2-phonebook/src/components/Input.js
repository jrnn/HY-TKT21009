import React from 'react'

const Input = ({ input }) => {
  return (
    <tr>
      <td>{input.label}</td>
      <td>
        <input
          value={input.value}
          onChange={input.onChange}
        />
      </td>
    </tr>
  )
}

export default Input

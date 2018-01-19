import React from 'react'

const Input = ({ input }) => {
  if (input.isTable) {
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

  return (
    <div>
      {input.label}
      <input
        value={input.value}
        onChange={input.onChange}
      />
    </div>
  )
}

export default Input

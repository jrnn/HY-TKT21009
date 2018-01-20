import React from 'react'

const InputField = ({ label, value, onChange }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputField

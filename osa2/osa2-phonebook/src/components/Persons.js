import React from 'react'

const Persons = ({ persons, filter, handleClick }) => {
  return (
    <table>
      <tbody>
        {persons
          .filter(p =>
            p.name.toLowerCase().includes(filter.toLowerCase()))
          .map(p =>
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.number}</td>
              <td>
                <input
                  className="button"
                  type="submit"
                  value="Poista"
                  onClick={handleClick(p.id)}
                />
              </td>
            </tr>)
        }
      </tbody>
    </table>
  )
}

export default Persons

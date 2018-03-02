import React from "react"
import { Link } from "react-router-dom"

const Menu = () => (
  <div>
    <Link to="/">anecdotes</Link>&nbsp;|&nbsp;
    <Link to="/create">create new</Link>&nbsp;|&nbsp;
    <Link to="/about">about</Link>
  </div>
)

export default Menu

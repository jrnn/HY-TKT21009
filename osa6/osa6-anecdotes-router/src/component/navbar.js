import React from "react"
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"

const NavBar = () => (
  <Menu>
    <Menu.Item>
      <NavLink exact to="/">anecdotes</NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink exact to="/create">create new</NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink exact to="/about">about</NavLink>
    </Menu.Item>
  </Menu>
)

export default NavBar

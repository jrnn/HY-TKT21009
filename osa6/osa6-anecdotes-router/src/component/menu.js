import React from "react"
import { NavLink } from "react-router-dom"

const styleMenu = {
  background : "#85909b",
  padding : 10
}

const styleLink = {
  color : "white",
  padding : 10
}

const linkSelected = {
  background : "#212c37",
  color : "white",
  padding : 10  
}

const Menu = () => (
  <div style={styleMenu}>
    <NavLink
      exact to="/"
      style={styleLink}
      activeStyle={linkSelected}>
      anecdotes
    </NavLink>
    <NavLink
      exact to="/create"
      style={styleLink}
      activeStyle={linkSelected}>
      create new
    </NavLink>
    <NavLink
      exact to="/about"
      style={styleLink}
      activeStyle={linkSelected}>
      about
    </NavLink>
  </div>
)

export default Menu

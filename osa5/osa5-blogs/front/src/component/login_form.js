import React from "react"

const LoginForm = ({ login, handler, username, password }) => (
  <form onSubmit={login}>
    <div>
      Username
      <input
        type="text"
        name="username"
        value={username}
        onChange={handler}
      />
    </div>
    <div>
      Password
      <input
        type="password"
        name="password"
        value={password}
        onChange={handler}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

export default LoginForm

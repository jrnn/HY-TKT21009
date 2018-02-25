import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"

import App from "./app"
import anecdoteReducer from "./reducer"

const store = createStore(anecdoteReducer)

const renderApp = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById("root"))
}

renderApp()
store.subscribe(renderApp)

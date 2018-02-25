import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import App from "./app"
import unicafeReducer from "./reducer"

const store = createStore(unicafeReducer)

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById("root"))
}

renderApp()
store.subscribe(renderApp)

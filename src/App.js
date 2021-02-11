import React, { Component } from 'react'
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import {BrowserRouter, Route} from "react-router-dom"


export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Route path="/">
        <Home/>
      </Route>
      <Route path="/register" exact>
        <Register/>
      </Route>
      <Route path="/register/login">
        <Login/>
      </Route>
    </BrowserRouter>
    )
  }
}


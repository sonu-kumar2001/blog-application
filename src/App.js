import React, { Component } from 'react'
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import {BrowserRouter, Route} from "react-router-dom"
import SingleArticle from "./components/SingleArticle"
import CreateArticle from "./components/CreateArticle"
import EditArticle from "./components/EditArticle"
import Logout from "./components/Logout"
import Setting from "./components/Setting"

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact>
          <Home />
        </Route>
        
        <Route path="/register" exact>
          <Register />
        </Route>

        <Route path="/register/login">
          <Login />
        </Route>

        <Route path="/article/:slug" component={SingleArticle} />

        <Route path="/createArticle">
          <CreateArticle />
        </Route>

        <Route path="/update/article/:slug" component={EditArticle} exact />

        <Route path="/user" component={Setting} />

        <Route path="/logout" component={Logout}/>
      </BrowserRouter>
    );
  }
}


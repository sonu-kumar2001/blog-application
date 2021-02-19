import React, { Component } from 'react'
import {NavLink,Link} from "react-router-dom"

export default class Header extends Component {
    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        return (
          <header>
            <div className="logo">
              <h2>Conduit</h2>
            </div>
            <nav className="nav">
              <ul className="flex-vertical">
                <li>
                  <NavLink activeClassName="active" to="/" exact>
                    <i className="fas fa-home"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/register">
                    <i className="far fa-user-circle" />
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/createArticle">
                    <i className="far fa-edit"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/user">
                    <i
                      className={
                        user ? "visible fas fa-cog" : "hidden"
                      }></i>
                  </NavLink>
                </li>
                <li>
                  <Link to="/logout">
                    <i
                      className={
                        user ? "visible fas fa-sign-out-alt" : "hidden"
                      }></i>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
        );
    }
}

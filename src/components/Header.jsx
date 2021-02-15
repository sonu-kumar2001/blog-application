import React, { Component } from 'react'
import {NavLink} from "react-router-dom"

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="logo"><h2>Conduit</h2></div>
                <nav className="nav">
                    <ul className="flex-vertical">
                        <li>
                            <NavLink activeClassName="active" to="/" exact>
                                <i class="fas fa-home"></i>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/register">
                                <i class="far fa-user-circle" />
                            </NavLink>
                            </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

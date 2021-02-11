import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export default class Register extends Component {
    
    render() {
        return (
            <section className="login register">
                <h1 className="text-center">Login</h1>
                <div className="register-container flex">
                        <div className="form-image">
                            <img src="/media/form.jpg" alt="form-svg"/>
                        </div>
                    <form>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email" />
                                <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="password" placeholder="Password" />
                                <span className="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button type="submit" className="button is-success">Login</button>
                            </p>
                        </div>
                        <NavLink activeClassName="active" to="/register">
                            <p className="login-link">New user? Register</p>
                        </NavLink>
                    </form>
                </div>
            </section>
        )
    }
}

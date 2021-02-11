import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super()
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            errors: {
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        }
    }
    validateEmail = (email) => {
		const regex = /\S+@\S+\.\S+/;
		return regex.test(email);
    }
    validatePassword = (password)=> {
        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return regex.test(password);
    }

    changeHandler = ({target}) => {
        let {name,value} = target;
        let error = this.state.errors;

        switch (name) {
            case "username":
                error.username = value.length < 4 ? "username must be at least 3 character" : ""
                break;
            case "email" :
                error.email = this.validateEmail(value) ? "" : "Email is not valid"
                break;
            case "password" :
                error.password = this.validatePassword(value)? "Passwors should contain atleast a number and specail character" : ""
                break;
            case "confirmPassword" :
                error.confirmPassword = this.state.password === value ? "" : "Password didn't matched"
                break;
            default:
                break;
        }
        this.setState({
            error,[name]: value
        })
    }

    render() {
        const{username,email,password,confirmPassword} = this.state.errors;
        return (
            <section className="register">
                <h1 className="text-center">Register</h1>
                <div className="register-container flex">
                        <div className="form-image">
                            <img src="/media/form.jpg" alt="form-svg"/>
                        </div>
                    <form>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className={username ? "error input" : "success input"}  type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.changeHandler} />
                                <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <span className="text-red">{username}</span>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className={email ? "error input" : "success input"} type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.changeHandler} />
                                <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <span className="text-red">{email}</span>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className={password ? "error input" : "success input"} type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler} />
                                <span className="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <span className="text-red">{password}</span>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className={confirmPassword ? "error input" : "success input"} type="password" placeholder="Confirm Password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.changeHandler} />
                                <span className="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                                </span>
                                <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <span className="text-red">{confirmPassword}</span>
                        <div className="field">
                            <p className="control">
                                <button type="submit" className="button is-success">Register</button>
                            </p>
                        </div>
                        <Link to="/register/login">
                            <p className="login-link">Already have an account? Login</p>
                        </Link>
                    </form>
                </div>
            </section>
        )
    }
}

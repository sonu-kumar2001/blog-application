import React, { Component } from 'react'
import { Link,Redirect } from "react-router-dom";
import Header from "./Header"

export default class Register extends Component {
    constructor(props) {
        super()
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            isUserSignup : false,
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
                error.username = value.length < 6 ? "username must be at least 6 character" : ""
                break;
            case "email" :
                error.email = this.validateEmail(value) ? "" : "Email is not valid"
                break;
            case "password" :
                error.password = this.validatePassword(value)? "" : "Passwors should contain atleast a number and specail character"
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

    submitHandler = async (event) => {
        event.preventDefault();
        const user = {
            "user" : {
                "username":this.state.username,
                "email": this.state.email,
                "password":this.state.password
            }
        }
        try {         
            await fetch(`/api/users`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(user)})
               .then((res) => res.json())
               .then((data) => localStorage.setItem('token',data.user.createdToken))
               .then(() => this.setState({isUserSignup:!this.state.isUserSignup}))               
          } catch (error) {
              console.error('Error',error)
          }
    }

    render() {
        const{username,email,password,confirmPassword} = this.state.errors;

        if(localStorage.getItem('token') || this.state.isUserSignup){
            return   <Redirect to='/' />
        }
        return (
            <section className="flex">
                <Header/>
            <div className="register">
                <h1 className="text-center">Register</h1>
                <div className="register-container flex">
                        <div className="form-image">
                            <img src="/media/form.jpg" alt="form-svg"/>
                        </div>
                    <form onSubmit= {this.submitHandler}>
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
            </div>
            </section>
        )
    }
}

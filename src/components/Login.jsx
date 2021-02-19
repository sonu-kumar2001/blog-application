import React, { Component } from 'react'
import { NavLink,Redirect } from "react-router-dom";
import Header from './Header';

export default class Register extends Component {
    
    constructor(props) {
        super()
        this.state = {
            email: "",
            password: "",
            isUserLoggedIn : false,
            errors: {
                email: "",
                password: "",
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
            case "email" :
                error.email = this.validateEmail(value) ? "" : "Email is not valid"
                break;
            case "password" :
                error.password = this.validatePassword(value)? "" : "Passwors should contain atleast a number and specail character"
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
                "email": this.state.email,
                "password":this.state.password
            }
        }
        try {         
            await fetch(`/api/users/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(user)})
               .then((res) => res.json())
               .then((data) => localStorage.setItem('user',JSON.stringify(data.user)))
               .then(() => this.setState({isUserLoggedIn:!this.state.isUserLoggedIn}))               
          } catch (error) {
              console.error('Error',error)
          }
    }

    render() {
        const{email,password} = this.state.errors;
        if(localStorage.getItem('user') || this.state.isUserSignup){
            return   <Redirect to='/' />
        }
        return (
            <section className="flex">
                <Header/>
            <div className="login register">
                <h1 className="text-center">Login</h1>
                <div className="register-container flex">
                        <div className="form-image">
                            <img src="/media/form.jpg" alt="form-svg"/>
                        </div>
                    <form onSubmit={this.submitHandler}>
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
                            <p className="control">
                                <button type="submit" className="button is-success">Login</button>
                            </p>
                        </div>
                        <NavLink activeClassName="active" to="/register">
                            <p className="login-link">New user? Register</p>
                        </NavLink>
                    </form>
                </div>
            </div>
            </section>
        )
    }
}

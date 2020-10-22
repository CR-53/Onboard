import React from "react";
import "./style.css";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import UserStore from "../../stores/UserStore";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false,
            // error messages
            noUsername: false,
            noPassword: false,
            noUsernameAndPassword: false,
            noMatch: false,
        }
    }

    setInputValue(property, val) {
        val = val.trim();
        if (val.length > 15) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    resetErrorMessages() {
        setTimeout(() => {
            this.setState({
                noUsername: false,
                noPassword: false,
                noUsernameAndPassword: false,
                noMatch: false
            })
        }, 4000)
    }

    async doLogin() {
        if (!this.state.username && !this.state.password) {
            this.setState({
                noUsernameAndPassword: true
            })
            this.resetErrorMessages()
            return;
        }
        if (!this.state.username) {
            this.setState({
                noUsername: true
            })
            this.resetErrorMessages()
            return;
        }
        if (!this.state.password) {
            this.setState({
                noPassword: true
            })
            this.resetErrorMessages()
            return;
        }
        this.setState({
            buttonDisabled: true
        })

        try {
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
                window.location.href = '/'
            }

            else if (result && result.success === false) {
                this.setState({
                    noMatch: true
                })
                this.resetErrorMessages()
                this.resetForm();
            }
        }

        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }

    render() {

        const errorMessages = [
            "Please enter a username",
            "Please enter a password",
            "Please enter a username & password",
            "Invalid username or password"
        ]

        return (
            <div className="loginForm">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="login-text">Log in</h3>
                            <InputField
                                type='text'
                                placeholder='Username'
                                value={this.state.username ? this.state.username : ''}
                                onChange={(val) => this.setInputValue('username', val)}
                            />
                            <InputField
                                type='password'
                                placeholder='Password'
                                value={this.state.password ? this.state.password : ''}
                                onChange={(val) => this.setInputValue('password', val)}
                            />
                            <SubmitButton
                                text="Log in"
                                disabled={this.state.buttonDisabled}
                                onClick={() => this.doLogin()}
                            />
                            {this.state.noUsername &&
                                <h4 className="error">{errorMessages[0]}</h4>
                            }
                            {this.state.noPassword &&
                                <h4 className="error">{errorMessages[1]}</h4>
                            }
                            {this.state.noUsernameAndPassword &&
                                <h4 className="error">{errorMessages[2]}</h4>
                            }
                            {this.state.noMatch &&
                                <h4 className="error">{errorMessages[3]}</h4>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm;
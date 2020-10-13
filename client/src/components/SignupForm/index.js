import React from "react";
import "./style.css";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import UserStore from "../../stores/UserStore";

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            username: '',
            password: '',
            buttonDisabled: false
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

    async doSignup() {
        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }
        this.setState({
            buttonDisabled: true
        })

        try {
            let res = await fetch('/signup', {
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
                window.location.href='/success'
            }

            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }
        }

        catch(e) {
            console.log(e);
            this.resetForm();
        }
    }

    render() {
        return (
            <div className="signupForm">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Create a new account</h3>
                            <InputField 
                                type='text'
                                placeholder='Username'
                                value={this.state.username ? this.state.username : ''}
                                onChange={ (val) => this.setInputValue('username', val) }
                            />
                            <InputField 
                                type='password'
                                placeholder='Password'
                                value={this.state.password ? this.state.password : ''}
                                onChange={ (val) => this.setInputValue('password', val) }
                            />
                            <SubmitButton 
                                text="Sign up"
                                disabled={this.state.buttonDisabled}
                                onClick={ () => this.doSignup() }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupForm;
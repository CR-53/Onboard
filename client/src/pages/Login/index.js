import React from "react";
import "./style.css";
import { observer } from "mobx-react";
import LoginForm from "../../components/LoginForm";
import SubmitButton from "../../components/SubmitButton";
import UserStore from "../../stores/UserStore";


class Login extends React.Component {

    async componentDidMount() {
        try {
            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            let result = await res.json();

            if (result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }

            else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }

        }

        catch (e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }

    async doLogout() {
        try {
            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            let result = await res.json();

            if (result && result.success) {
                UserStore.isLoggedIn = false;
                UserStore.username = '';
                window.location.href='/'
            }

        }

        catch (e) {
            console.log(e);
        }
    }

    render() {

        if (UserStore.loading) {
            return (
                <div className="app">
                    <div className="container">
                        <h3>Loading, please wait...</h3>
                    </div>
                </div>
            )
        }

        else {

            if (UserStore.isLoggedIn) {
                return (
                    <div className="app">
                        <div className="container">
                            <div className="row first-section">
                                <div className="col-md-12">
                                    <h3 className="section-heading">Welcome, <span className="username">{UserStore.username}</span>!</h3>
                                    <a href="/"><SubmitButton
                                        text={"Log out"}
                                        disabled={false}
                                        onClick={ () => this.doLogout() }
                                    /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            return (
                <div className="app">
                    <div className="container">
                        <LoginForm />
                        <a href="/signup">
                            <SubmitButton
                                text={"Sign up"}
                                disabled={false}
                            />
                        </a>
                    </div>
                </div>
            )

        }

    }
}

export default observer(Login);
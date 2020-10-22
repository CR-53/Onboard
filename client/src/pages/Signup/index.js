import React from "react";
import "./style.css";
import { observer } from "mobx-react";
import SignupForm from "../../components/SignupForm";
import SubmitButton from "../../components/SubmitButton";
import UserStore from "../../stores/UserStore";

class Signup extends React.Component {

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
                        Loading, please wait...
                    </div>
                </div>
            )
        }

        else {

            if (UserStore.isLoggedIn) {
                return (
                    <div className="app">
                        <div className="container">
                            <p className="login-text already-logged-in">You are already logged in as <span className="username">{UserStore.username}</span>.
                            <br></br>Would you like to log out and register as a different user?</p>
                            
                            <a href="/signup"><SubmitButton
                                text={"Log out"}
                                disabled={false}
                                onClick={ () => this.doLogout() }
                            /></a>

                        </div>
                    </div>
                )
            }

            return (
                <div className="app">
                    <div className="container">
                        <SignupForm />
                    </div>
                </div>
            )

        }

    }
}

export default observer(Signup);
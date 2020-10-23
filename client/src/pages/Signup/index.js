import React from "react";
import "./style.css";
import { observer } from "mobx-react";
import SignupForm from "../../components/SignupForm";
import SubmitButton from "../../components/SubmitButton";
import UserStore from "../../stores/UserStore";
import API from "../../utils/API";
import { getFromStorage } from "../../stores/storage";

class Signup extends React.Component {

    async componentDidMount() {
        const obj = getFromStorage('onboard_login');
        if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            API.findUserSession(
                token).then(res => {
                    if (res.data) {
                        const id = res.data.userId;
                        API.getUserById(id).then(res => {
                            if (res.data) {
                                UserStore.loading = false;
                                UserStore.isLoggedIn = true;
                                UserStore.username = res.data.username;
                            }
                            else {
                                UserStore.loading = false;
                                UserStore.isLoggedIn = false;
                            }
                        })
                    }
                    else {
                        UserStore.loading = false;
                        UserStore.isLoggedIn = false;
                    }
                })
        }
        else {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }

    async doLogout() {
        const obj = getFromStorage('onboard_login');
        if (obj && obj.token) {
            const { token } = obj;
            // Delete session
            API.deleteUserSession(token).then(res => {
                if (res.data) {
                    UserStore.isLoggedIn = false;
                    UserStore.username = '';
                    window.location.href = '/login'
                }
            })
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
                                onClick={() => this.doLogout()}
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
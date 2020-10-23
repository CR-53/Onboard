import React from "react";
import "./style.css";
import { observer } from "mobx-react";
import SubmitButton from "../../components/SubmitButton";
import UserStore from "../../stores/UserStore";
import API from "../../utils/API";
import { getFromStorage } from "../../stores/storage";

class Success extends React.Component {

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
            console.log(token)
            // Delete session
            API.deleteUserSession(token).then(res => {
                if (res.data) {
                    UserStore.isLoggedIn = false;
                    UserStore.username = '';
                    window.location.href = '/login'
                }
            })
        }
        else {
            console.log(`could not retrieve token`)
        }
    }

    async doNothing() {
    }

    render() {

        if (UserStore.loading) {
            return (
                <div className="app">
                    <div className="container">
                        <div className="row first-section">
                            <div className="col-md-12">
                                <h3 className="section-heading">Loading, please wait...</h3>
                            </div>
                        </div>
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
                                    <h3 className="section-heading">Welcome, <span className="username">{UserStore.username}</span></h3>
                                    <a href="/"><SubmitButton
                                        text={"Log out"}
                                        disabled={false}
                                        onClick={() => this.doLogout()}
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
                        <div className="row first-section">
                            <div className="col-md-12">
                                <h3 className="section-heading">You have successfully signed up.<br></br>
                                    Please continue to login.
                                </h3>
                                <a href="/login"><SubmitButton
                                    text={"Log in"}
                                    disabled={false}
                                    onClick={() => this.doNothing()}
                                /></a>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }

    }
}

export default observer(Success);
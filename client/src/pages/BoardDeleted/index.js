import React from "react";
import "./style.css";
import { observer } from "mobx-react";
import SubmitButton from "../../components/SubmitButton";
import UserStore from "../../stores/UserStore";

class BoardDeleted extends React.Component {

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

    async doNothing() {
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

            return (
                <div className="app">
                    <div className="container">
                        <h3>Board successfully deleted by <span className="username">{UserStore.username}</span></h3>
                        
                        <a href="/"><SubmitButton
                            text={" Return Home"}
                            disabled={false}
                            onClick={ () => this.doNothing() }
                        /></a>

                    </div>
                </div>
            )
        }    
    }
}

export default observer(BoardDeleted);
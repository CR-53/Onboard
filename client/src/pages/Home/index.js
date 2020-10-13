import React from "react";
import "./style.css";
import UserStore from "../../stores/UserStore";
import { observer } from "mobx-react";

class Home extends React.Component {

    render() {
        return (
            <div className="app">
                <div className="container">
                    Homepage
                    <p>{UserStore.username}</p>
                </div>
            </div>
        )
    }
}

export default observer(Home);
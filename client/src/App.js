import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navigation from "./components/Navigation";
import Wrapper from "./components/Wrapper";
import Footer from "./components/Footer"
import NewBoard from "./pages/NewBoard"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Success from './pages/Success'
import Home from './pages/Home'
import BoardDeleted from './pages/BoardDeleted'
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChartLine, faCog, faComments, faPencilRuler, faCaretUp, faCaretDown, faEllipsisV, faSort, faUser  } from '@fortawesome/free-solid-svg-icons'
import Board from "./components/Board";
import API from "../src/utils/API";
import { getFromStorage } from "../src/stores/storage";

library.add(fab, faChartLine, faCog, faComments, faPencilRuler, faCaretUp, faCaretDown, faEllipsisV, faSort, faUser)

class App extends React.Component {

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
                    window.location.href = '/'
                }
            })
        }
    }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Navigation />
          <Wrapper>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/new-board" component={NewBoard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/board/:id" component={Board} />
            <Route exact path="/board-deleted" component={BoardDeleted} />
          </Wrapper>
        <Footer />
        </div>
    </Router>
    )
  }
}

export default observer(App);

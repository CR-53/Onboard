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
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChartLine, faComments, faPencilRuler, faCaretUp, faCaretDown, faSort, faUser } from '@fortawesome/free-solid-svg-icons'
import Board from "./components/Board";

library.add(fab, faChartLine, faComments, faPencilRuler, faCaretUp, faCaretDown, faSort, faUser)

class App extends React.Component {

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
              console.log(`logged out`)
          }
          else {
              console.log(`else`)
          }

      }

      catch (e) {
          console.log(e);
      }
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Wrapper>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/new-board" component={NewBoard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/board/:id" component={Board} />
          </Wrapper>
          <Footer />
        </div>
    </Router>
    )
  }
}

export default observer(App);

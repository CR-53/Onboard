import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import logo from "../../assets/images/logo.png";
import { observer } from "mobx-react";
import UserStore from "../../stores/UserStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import API from "../../utils/API";
import { getFromStorage } from "../../stores/storage";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Navigation extends React.Component {

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

    render() {

        if (UserStore.isLoggedIn) {
            return (
                <Navbar>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} className="logo" alt="Logo" />
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link className="create-a-board-link" as={Link} to="/new-board">Create a board</Nav.Link>
                        <div className="center-wrap">
                            <Dropdown>
                                <Dropdown.Toggle className="btn-background" id="login-dropdown">
                                    <FontAwesomeIcon icon="user" /> {UserStore.username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-loggedin">
                                    <Dropdown.Item className="dropdown-nav-item" href="/login">Logout</Dropdown.Item>
                                </Dropdown.Menu>    
                            </Dropdown>
                        </div>
                    </Nav>
                </Navbar>
            );
        } else {
            return (
                <Navbar>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} className="logo" alt="Logo" />
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/new-board">Create a board</Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle className="btn-background" id="login-dropdown">
                                <FontAwesomeIcon icon="user" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-loggedout">
                                <Dropdown.Item className="dropdown-nav-item" href="/login">Login</Dropdown.Item>
                                <Dropdown.Item className="dropdown-nav-item" href="/signup">Signup</Dropdown.Item>
                            </Dropdown.Menu>    
                        </Dropdown>
                    </Nav>
                </Navbar>
            );
        }

    }
}

export default observer(Navigation);
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import logo from "../../assets/images/logo.png"

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navigation() {
    return (
        <Navbar>
            <Navbar.Brand as={Link} to="/">
                <img src={logo} className="logo" alt="Logo" />
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link as={Link} to="/new-board">Create a board</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navigation;
import React from "react";
import "./style.css";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card } from 'react-bootstrap';

class Home extends React.Component {

    render() {
        return (
            <div className="app">
                <div className="container">
                    <div className="row first-section">
                        <div className="col-md-12">
                            <h3 className="section-heading">Connect directly with your users</h3>
                            <hr className="section-hr"></hr>
                        </div>
                        <div className="col-md-4">
                            <Card>
                                <Card.Body className="home-card">
                                    <Card.Title className="card-icon"><FontAwesomeIcon icon="comments" /></Card.Title>
                                    <Card.Title className="card-title">Instant Feedback</Card.Title>
                                    <Card.Text className="card-text">
                                        With Onboard, your users have a platform where they can voice their opinions directly to you, with no delays.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card>
                                <Card.Body className="home-card">
                                    <Card.Title className="card-icon"><FontAwesomeIcon icon="pencil-ruler" /></Card.Title>
                                    <Card.Title className="card-title">Simple, Streamlined Design</Card.Title>
                                    <Card.Text className="card-text">
                                        No more sticky notes or clunky spreadsheets, Onboard's slick design allows you quick access to your users valuable insights.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-4">
                            <Card>
                                <Card.Body className="home-card">
                                    <Card.Title className="card-icon"><FontAwesomeIcon icon="chart-line" /></Card.Title>
                                    <Card.Title className="card-title">Improve Your Product</Card.Title>
                                    <Card.Text className="card-text">
                                        Onboard's voting system allows you to easily see the most popular suggestions amongst your users to help you improve your product.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="row new-section">
                        <div className="col-md-12">
                            <h3 className="section-heading">View popular feedback boards</h3>
                            <hr className="section-hr"></hr>
                        </div>
                        <div className="col-md-3">
                            <p>board 1</p>
                        </div>
                        <div className="col-md-3">
                            <p>board 2</p>
                        </div>
                        <div className="col-md-3">
                            <p>board 3</p>
                        </div>
                        <div className="col-md-3">
                            <p>board 4</p>
                        </div>
                    </div>
                    <div className="row new-section">
                        <div className="col-md-12">
                            <h3 className="section-heading">Search for a feedback board</h3>
                            <hr className="section-hr"></hr>
                            <div className="center-wrap">
                                <a href="/new-board"><Button className="new-board-btn btn-background">Search</Button></a>
                            </div>
                        </div>
                    </div>
                    <div className="row new-section">
                        <div className="col-md-12">
                            <h3 className="section-heading">Ready to get more intune with your users?</h3>
                            <hr className="section-hr"></hr>
                            <div className="center-wrap">
                                <a href="/new-board"><Button className="new-board-btn btn-background">Create a new board</Button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(Home);
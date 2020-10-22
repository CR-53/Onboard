import React from "react";
import "./style.css";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import InputField from '../../components/InputField';
import SubmitButton from '../../components/SubmitButton';
import SuggestionButton from '../../components/SuggestionButton';
import API from "../../utils/API";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // search
            search: '',
            noSearchValue: false,
            searchActive: false,
            couldNotFindBoards: false,
            foundBoards: []
        }
    }

    setInputValueSearch(property, val) {
        if (val.length > 30) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetSearchField() {
        this.setState({
            search: ''
        })
    }

    resetMessages() {
        setTimeout(() => {
            this.setState({
                noSearchValue: false,
                searchActive: false,
                couldNotFindBoards: false,
            })
        }, 4000)
    }

    async searchForBoard() {
        if (!this.state.search) {
            this.setState({
                searchActive: true,
                noSearchValue: true
            })
            this.resetMessages();
            return;
        }
        let searchQuery = this.state.search.toLowerCase();
        API.getBoardByTitle(searchQuery).then(res => {
            if (res.data.length > 0) {
                this.setState({
                    foundBoards: res.data
                })
            }
            else {
                this.setState({
                    searchActive: true,
                    couldNotFindBoards: true,
                    foundBoards: []
                })
                this.resetMessages();
            }
        })
            .then(() => this.resetSearchField())
    }

    async doNothing() {
    }

    render() {

        const messages = [
            "Enter a word in the field above to search",
            "Could not find any matching boards",
            "New boards found. Click on a board to view:"
        ]

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
                            <h3 className="section-heading">Ready to get more in tune with your users?</h3>
                            <hr className="section-hr"></hr>
                            <div className="center-wrap">
                                <a href="/new-board">
                                    <SuggestionButton
                                        text="Create a board"
                                        onClick={() => this.doNothing()}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="row new-section search-section">
                        <div className="col-md-12">
                            <h3 className="section-heading">Search for a feedback board</h3>
                            <hr className="section-hr"></hr>
                            <div className="center-wrap">
                                {this.state.foundBoards.length > 0 &&
                                    <h4 className="success">{messages[2]}</h4>
                                }
                                {this.state.foundBoards.length ? (
                                    <ul className="search-results">
                                        {this.state.foundBoards.map(board => (
                                            <li key={board._id}>
                                                <div className="board-search">
                                                    <a className="board-search-title-link" href={`/board/${board.slug}`}>{board.title}</a>
                                                    <p className="board-search-description">
                                                        {board.description.length > 80 ?
                                                            `${board.description.substring(0, 80 - 3)}...` : board.description}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                        <div></div>
                                    )}
                                <InputField
                                    type='text'
                                    placeholder="Search for a board by title"
                                    value={this.state.search}
                                    onChange={(val) => this.setInputValueSearch('search', val)}
                                />
                                <SubmitButton
                                    text='Search'
                                    onClick={() => this.searchForBoard()}
                                />
                                {!this.state.searchActive &&
                                    <h4 className="note">Enter a key word to find all boards that match</h4>
                                }
                                {this.state.noSearchValue &&
                                    <h4 className="error">{messages[0]}</h4>
                                }
                                {this.state.couldNotFindBoards &&
                                    <h4 className="error">{messages[1]}</h4>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(Home);
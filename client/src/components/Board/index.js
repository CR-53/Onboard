import React from "react";
import "./style.css";
import UserStore from "../../stores/UserStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputField from "../InputField";
import TextBox from "../TextBox";
import SortButton from "../SortButton";
import UpvoteButton from "../UpvoteButton";
import DownvoteButton from "../DownvoteButton";
import SuggestionButton from "../SuggestionButton";
import { withRouter } from "react-router";
import API from "../../utils/API";
import AnchorLink from 'react-anchor-link-smooth-scroll'

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // page loading
            loading: true,
            // board data
            boardTitle: '',
            boardDescription: '',
            boardOwner: '',
            boardID: '',
            // suggestion data
            title: '',
            description: '',
            owner: '',
            buttonDisabled: false,
            // suggestion load data
            suggestions: [],
            // admin controls
            adminDisplay: false
        }
    }

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
                this.setState({
                    owner: UserStore.username
                })
            }

            else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                console.log(`user is not logged in`)
            }
            const slug = this.props.match.params.id;
            API.getBoardBySlug(slug).then(res => {
                this.setState({
                    loading: false,
                    boardTitle: res.data[0].title,
                    boardDescription: res.data[0].description,
                    boardOwner: res.data[0].owner,
                    boardID: res.data[0]._id
                })
                if (this.state.owner === res.data[0].owner) {
                    this.setState({
                        adminDisplay: true
                    })
                }
                console.log(`admin controls = ` + this.state.adminDisplay)
                API.getSuggestionsByBoardID(res.data[0]._id).then(res => {
                    this.setState({
                        suggestions: res.data
                    })
                })
            })
            this.setState({
                loading: false
            })
        }

        catch (e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }

    async loadSuggestions(boardID) {
        API.getSuggestionsByBoardID(boardID).then(res => {
            this.setState({
                suggestions: res.data
            })
        })
    }

    setInputValueSuggestionTitle(property, titleVal) {
        if (titleVal.length > 100) {
            return;
        }
        this.setState({
            [property]: titleVal
        })
    }

    setInputValueSuggestionText(property, textVal) {
        if (textVal.length > 300) {
            return;
        }
        this.setState({
            [property]: textVal
        })
    }

    resetNewSuggestionField() {
        this.setState({
            title: '',
            description: '',
            buttonDisabled: false
        })
    }

    async saveNewSuggestion() {
        if (!this.state.title) {
            console.log(`no suggestion text`)
            return;
        }
        if (!this.state.description) {
            console.log(`no suggestion description`)
            return;
        }
        if (!this.state.owner) {
            console.log(`no suggestion owner`)
        }
        // save suggestion to database here
        console.log(`suggestion data: ` + this.state.title + " | " + this.state.description + " | " + this.state.owner + " | " + this.state.boardID)
        API.saveSuggestion({
            title: this.state.title,
            description: this.state.description,
            username: this.state.owner,
            upvotes: [],
            downvotes: [],
            boardID: this.state.boardID
        })
            .then(() => console.log(`new suggestion created: ` + this.state.title + " | " + this.state.description + " | " + this.state.owner + " | " + this.state.boardID))
            .then(() => this.resetNewSuggestionField())
            .then(() => this.loadSuggestions(this.state.boardID))
            .catch(err => console.log(err))
    }

    async sortByVotes() {
        alert(`sort by votes`)
    }

    async sortByNewst() {
        alert(`sort by newest`)
    }

    async movePageToSuggestion() {
        alert(`move page to suggestion`)
    }

    async addOne(id) {
        if (this.state.owner) {
            API.getSuggestion(id).then(res => {
                if (res.data.upvotes.includes(this.state.owner)) {
                    console.log(`USER FOUND: ` + this.state.owner)
                    API.updateSuggestion(id, {
                        $pull: { upvotes: this.state.owner }
                    })
                }
                else {
                    console.log(`USER NOT FOUND ` + this.state.owner)
                    API.updateSuggestion(id, {
                        $addToSet: { upvotes: this.state.owner },
                        $pull: { downvotes: this.state.owner}
                    })
                }
            })
            .then(() => this.loadSuggestions(this.state.boardID))
        }
        else {
            alert(`you must be logged in to vote`)
        }
    }

    async minusOne(id) {
        if (this.state.owner) {
            API.getSuggestion(id).then(res => {
                if (res.data.downvotes.includes(this.state.owner)) {
                    console.log(`USER FOUND: ` + this.state.owner)
                    API.updateSuggestion(id, {
                        $pull: { downvotes: this.state.owner }
                    })
                }
                else {
                    console.log(`USER NOT FOUND ` + this.state.owner)
                    API.updateSuggestion(id, {
                        $addToSet: { downvotes: this.state.owner },
                        $pull: { upvotes: this.state.owner}
                    })
                }
            })
            .then(() => this.loadSuggestions(this.state.boardID))
        }
        else {
            alert(`you must be logged in to vote`)
        }
    }

    async doNothing() {
        console.log(`nothing`)
    }


    render() {
        const votesText = `Votes`;
        const votesNewest = <React.Fragment>{votesText}&nbsp;<FontAwesomeIcon icon="sort">Votes</FontAwesomeIcon></React.Fragment>
        const newestText = `Newest`;
        const sortNewest = <React.Fragment>{newestText}&nbsp;<FontAwesomeIcon icon="sort">Newest</FontAwesomeIcon></React.Fragment>

        if (this.state.loading === true) {

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Loading, please wait...</h3>
                        </div>
                    </div>
                </div>
            )
        }

        else {

            if (!this.state.boardTitle) {

                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Could not find board at this location, please check URL and try again</h3>
                            </div>
                        </div>
                    </div>
                )
            }

            else {

                return (
                    <div className="container board-container">
                        <div className="row board-header">
                            <div className="col-md-12">
                                <h3 className="board-heading">Provide suggestions for <span className="board-title">{this.state.boardTitle}</span></h3>
                            </div>
                            <div className="col-md-12">
                                <p className="board-description">{this.state.boardDescription}</p>
                            </div>
                        </div>
                        <div className="row board-button-row">
                            <div className="col-lg-12">
                                <SortButton
                                    text={votesNewest}
                                    onClick={() => this.sortByVotes()}
                                ></SortButton>
                                <SortButton
                                    text={sortNewest}
                                    onClick={() => this.sortByNewest()}
                                ></SortButton>
                                <AnchorLink href='#suggestion-area'><SuggestionButton
                                    text="Make a suggestion"
                                    onClick={() => this.doNothing()}
                                ></SuggestionButton></AnchorLink>
                            </div>
                        </div>
                        <div className="row board-suggestions-row">
                            <div className="col-md-12">
                                {this.state.suggestions.length ? (
                                    <ul>
                                        {this.state.suggestions.map(suggestion => (
                                            <li key={suggestion._id}>
                                                <p className="suggestion-title">{suggestion.title}</p>
                                                <p className="suggestion-description">{suggestion.description}</p>
                                                <p className="suggestion-details"><span className="suggestion-username">{suggestion.username}</span>&nbsp;•&nbsp;<span className="suggestion-time">{suggestion.createdAt}</span></p>
                                                <UpvoteButton
                                                    text={<span><FontAwesomeIcon icon="caret-up" />&nbsp;{suggestion.upvotes.length}</span>}
                                                    onClick={() => this.addOne(suggestion._id)}
                                                />
                                                <DownvoteButton
                                                    text={<span><FontAwesomeIcon icon="caret-down" />&nbsp;{suggestion.downvotes.length}</span>}
                                                    onClick={() => this.minusOne(suggestion._id)}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                        <p className="no-suggestion-text">No suggestions have been made on this board, be the first below!</p>
                                    )}
                            </div>
                        </div>
                        <div className="row new-suggestion-row" id="suggestion-area">
                            <div className="col-lg-12 suggestion-form-area">
                                <h4 className="make-a-suggestion-text">Make a new suggestion</h4>
                            </div>
                            <div className="col-lg-12 suggestion-form-area">
                                <InputField
                                    type='text'
                                    placeholder="Give your suggestion a name"
                                    value={this.state.title}
                                    onChange={(titleVal) => this.setInputValueSuggestionTitle('title', titleVal)}
                                ></InputField>
                            </div>
                            <div className="col-lg-12 suggestion-form-area">
                                <TextBox
                                    placeholder="Provide some details of your suggestion"
                                    value={this.state.description}
                                    onChange={(textVal) => this.setInputValueSuggestionText('description', textVal)}
                                ></TextBox>
                            </div>
                            <div className="col-lg-12 suggestion-form-area button-area">
                                <SuggestionButton
                                    text="Submit suggestion"
                                    disabled={this.state.buttonDisabled}
                                    onClick={() => this.saveNewSuggestion()}
                                ></SuggestionButton>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

}

export default withRouter(Board);
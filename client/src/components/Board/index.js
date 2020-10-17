import React from "react";
import "./style.css";
import UserStore from "../../stores/UserStore";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import SortButton from "../SortButton";
// import { BrowserRouter as useParams } from "react-router-dom";
import { withRouter } from "react-router";
import API from "../../utils/API";


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
            // suggestion data
            title: '',
            description: '',
            owner: '',
            buttonDisabled: false
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
                console.log(`username = ` + UserStore.username)
                console.log(`owner = ` + this.state.owner)
            }

            else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                console.log(`user is not logged in`)
            }
            // let params = useParams()
            // console.log(`params = ` + params )
            const slug = this.props.match.params.id;
            console.log(slug);
            API.getBoards().then(res => {
                res.data.forEach(board => {
                    if (slug === board.slug) {
                        console.log(`match found!`)
                        this.setState({
                            loading: false,
                            boardTitle: board.title,
                            boardDescription: board.description,
                            boardOwner: board.owner
                        })
                    }
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

    setInputValueSuggestionTitle(property, titleVal) {
        if (titleVal.length > 100) {
            return;
        }
        this.setState({
            [property]: titleVal
        })
    }

    setInputValueSuggestionText(property, textVal) {
        if (textVal.length > 350) {
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

    async doNewSuggestion() {
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
        // .then reload all suggestions for this board
        // .then(() => this.resetNewSuggestionField())
        // .catch(err => console.log(err));
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

    render() {

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
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="board-heading">Provide suggestions for <span className="board-title">{this.state.boardTitle}</span></h3>
                            </div>
                            <div className="col-md-12">
                                <p className="board-description">{this.state.boardDescription}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2">
                                <SortButton 
                                        text="Most voted"
                                        onClick={() => this.sortByVotes()}
                                ></SortButton>
                            </div>
                            <div className="col-lg-2">
                                <SortButton
                                        text="Newest"
                                        onClick={() => this.sortByNewest()}
                                ></SortButton>
                            </div>
                            <div className="col-lg-4">
                                <SubmitButton
                                        text="Make a suggestion"
                                        onClick={() => this.movePageToSuggestion()}
                                ></SubmitButton>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ul>
                                    <li>
                                        <p clasName="suggestion-title">Suggestion title</p>
                                        <p className="suggestion-description">Suggestion description</p>
                                        <p className="suggestion-username">Username</p>
                                        <p>+</p>
                                        <p>-</p>
                                    </li>    
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <InputField
                                    type='text'
                                    placeholder="Give your suggestion a name"
                                    value={this.state.title}
                                    onChange={(titleVal) => this.setInputValueSuggestionTitle('title', titleVal)}
                                ></InputField>
                            </div>
                            <div className="col-lg-12">
                                <InputField
                                    type='textarea'
                                    placeholder="Details"
                                    value={this.state.description}
                                    onChange={(textVal) => this.setInputValueSuggestionText('description', textVal)}
                                ></InputField>
                            </div>
                            <div className="col-lg-12">
                                <SubmitButton
                                    text="Submit"
                                    disabled={this.state.buttonDisabled}
                                    onClick={() => this.doNewSuggestion()}
                                ></SubmitButton>
                            </div>
                        </div>
                    </div>
                )

            }

        }

    }

}

export default withRouter(Board);
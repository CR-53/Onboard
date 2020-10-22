import React from "react";
import "./style.css";
import UserStore from "../../stores/UserStore";
import InputField from "../../components/InputField";
import TextBox from "../../components/TextBox";
import SuggestionButton from "../../components/SuggestionButton";
import { observer } from "mobx-react";
import API from "../../utils/API";
import Loader from 'react-loader-spinner';

class NewBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // board data
            title: '',
            description: '',
            owner: '',
            slug: '',
            // checking slug
            checkNumber: 0,
            checkingSlug: false,
            // error messages
            noBoardTitle: false,
            noBoardDescription: false,
            noBoardTitleOrDescription: false,
            userNotLoggedIn: false
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
            }

        }

        catch (e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }

    setInputValueName(property, nameVal) {
        if (nameVal.length > 30) {
            return;
        }
        this.setState({
            [property]: nameVal
        })
    }

    setInputValueDescription(property, descriptionVal) {
        if (descriptionVal.length > 300) {
            return;
        }
        this.setState({
            [property]: descriptionVal
        })
    }

    resetForm() {
        this.setState({
            title: '',
            description: '',
            noBordTitle: false
        })
    }

    resetErrorMessages() {
        setTimeout(() => {
            this.setState({
                noBoardTitle: false,
                noBoardDescription: false,
                noBoardTitleOrDescription: false,
                userNotLoggedIn: false
            })
        }, 4000)
    }


    async saveNewBoard() {
        if (!this.state.title && !this.state.description) {
            this.setState({
                noBoardTitleOrDescription: true
            })
            this.resetErrorMessages();
            return;
        }
        if (!this.state.title) {
            this.setState({
                noBoardTitle: true
            })
            this.resetErrorMessages();
            return;
        }
        if (!this.state.description) {
            this.setState({
                noBoardDescription: true
            })
            this.resetErrorMessages();
            return;
        }
        if (!this.state.owner) {
            this.setState({
                userNotLoggedIn: true
            })
            this.resetErrorMessages();
            return;
        }
        var slug = this.state.title.split(' ').join('-');
        slug = slug.toLowerCase();
        this.slugCheck(slug)
    }

    // checks if slug exists in database before saving new board
    async slugCheck(slug) {
        this.setState({
            checkingSlug: true
        })
        API.getBoardBySlug(slug).then(res => {
            if (res.data.length === 1) {
                var updateCheckNumber = this.state.checkNumber + 1;
                this.setState({
                    checkNumber: updateCheckNumber
                })
                setTimeout(() => {
                    if (this.state.checkNumber < 2) {
                        const hyphen = "-"
                        slug = slug + hyphen + this.state.checkNumber 
                    }
                    else {
                        let popSlug = slug.substr(0, slug.lastIndexOf("-") + 1)
                        // const hyphen = "-"
                        slug = popSlug + this.state.checkNumber
                    }
                }, 1000)
                setTimeout(() => {
                    this.slugCheck(slug)
                }, 1500)
            }
            else {
                var checkedSlug = slug;
                this.setState({
                    checkNumber: 0,
                    checkingSlug: false
                })
                API.saveBoard({
                    title: this.state.title,
                    description: this.state.description,
                    owner: this.state.owner,
                    slug: checkedSlug
                })
                    .then(() => this.resetForm())
                    .then(() => window.location.href = "/board/" + checkedSlug)
                    .catch(err => console.log(err))
                return;
            }
        })
    }

    render() {

        const errorMessages = [
            "Please provide a board title",
            "Please provide a board description",
            "Please provide a board title & description",
            "You must be logged in to create a board"
        ]

        return (
            <div className="container">
                <div className="row first-section new-board-row">
                    <div className="col-md-12">
                        <h3 className="section-heading">Create a new feedback board</h3>
                    </div>
                    <div className="col-md-12">
                        <div className="center-wrap">
                            <InputField
                                type='text'
                                placeholder="Enter your project name"
                                value={this.state.title}
                                onChange={(nameVal) => this.setInputValueName('title', nameVal)}
                            />
                            <TextBox
                                placeholder="Enter a short description of your project"
                                value={this.state.description}
                                onChange={(descriptionVal) => this.setInputValueDescription('description', descriptionVal)}
                            />
                            <SuggestionButton
                                text="Create board"
                                onClick={() => this.saveNewBoard()}
                            />
                            {this.state.noBoardTitle &&
                                <h4 className="error">{errorMessages[0]}</h4>
                            }
                            {this.state.noBoardDescription &&
                                <h4 className="error">{errorMessages[1]}</h4>
                            }
                            {this.state.noBoardTitleOrDescription &&
                                <h4 className="error">{errorMessages[2]}</h4>
                            }
                            {this.state.userNotLoggedIn &&
                                <h4 className="error">{errorMessages[3]}</h4>
                            }
                            {this.state.checkingSlug && 
                                <div className="creating-board-div">
                                <Loader className="loader" type="Rings" color="#03dba7" height="50" width="50" />
                                <h4 className="creating-board">Creating your board, please wait...</h4>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(NewBoard);
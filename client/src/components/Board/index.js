import React from "react";
import "./style.css";
import { observer } from "mobx-react";
import UserStore from "../../stores/UserStore";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import { BrowserRouter as useParams } from "react-router-dom";
  

class Board extends React.Component {

    // params = useParams();

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            owner: '',
            buttonDisabled: false
        }
    }

    async componentDidMount() {
        // let params = useParams();
        // console.log(params)
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
                let params = useParams();
                console.log(params)
                console.log(`username = ` + UserStore.username)
                console.log(`owner = ` + this.state.owner)
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>insert board name here</h3>
                    </div>
                    <div className="col-md-12">
                        <p>insert board description here</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>insert suggestions here</p>
                    </div>
                </div>
                <div className="row">
                    <InputField
                        type='text'
                        placeholder="Give your suggestion a name"
                        value={this.state.title}
                        onChange={(titleVal) => this.setInputValueSuggestionTitle('title', titleVal)}
                    ></InputField>
                    <InputField
                        type='textarea'
                        placeholder="Details"
                        value={this.state.description}
                        onChange={(textVal) => this.setInputValueSuggestionText('description', textVal)}
                    ></InputField>
                    <SubmitButton
                        text="Submit"
                        disabled={this.state.buttonDisabled}
                        onClick={() => this.doNewSuggestion()}
                    ></SubmitButton>
                </div>
            </div>
        )

    }

}

export default observer(Board);
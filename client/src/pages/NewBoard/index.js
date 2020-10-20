import React from "react";
import "./style.css";
import UserStore from "../../stores/UserStore";
import InputField from "../../components/InputField";
import TextBox from "../../components/TextBox";
import SubmitButton from "../../components/SubmitButton";
import { observer } from "mobx-react";
import API from "../../utils/API";

class NewBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // board data
            title: '',
            description: '',
            owner: '',
            // number to add to slug if not unique
            checkNumber: 0
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
            description: ''
        })
    }

    // checks if slug already exists in database, if so adds a number to the end to make it unique
    async slugCheck(slug) {
        var updateCheckNumber = this.state.checkNumber + 1;
        this.setState({
            checkNumber: updateCheckNumber
        })
        API.getBoards().then(res => {
            res.data.forEach(board => {
                if (slug === board.slug) {
                    slug = slug + this.state.checkNumber;
                    console.log(`slug after added number = ` + slug)
                    this.slugCheck();
                }
            })
        })
    }

    async saveNewBoard() {
        if (!this.state.title) {
            console.log(`no project name`)
            return
        }
        if (!this.state.description) {
            console.log(`no project description`)
            return;
        }
        if (!this.state.owner) {
            console.log(`no owner - user is not logged in`)
            return;
        }
        var slug = this.state.title.split(' ').join('-');
        slug = slug.toLowerCase();
        await this.slugCheck(slug);
        // wait until above has been run
        console.log(`slug after check = ` + slug);
        API.saveBoard({
            title: this.state.title,
            description: this.state.description,
            owner: this.state.owner,
            slug: slug
          })
            .then(() => console.log(`new board created: ` + this.state.title + " | " + this.state.description + " | " + this.state.owner + " | " + slug))
            .then(() => this.resetForm())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <div className="row first-section new-board-row">
                    <div className="col-md-12">
                        <h3 className="section-heading">Create a new feedback board</h3>
                    </div>
                    <div className="col-md-12">
                        <InputField 
                            type='text'
                            placeholder="Enter your project name"
                            value={this.state.title}
                            onChange={ (nameVal) => this.setInputValueName('title', nameVal) }
                        />
                        <TextBox
                            placeholder="Enter a short description of your project"
                            value={this.state.description}
                            onChange={ (descriptionVal) => this.setInputValueDescription('description', descriptionVal) }
                        />
                        <SubmitButton
                            text="Create"
                            onClick={ () => this.saveNewBoard() }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(NewBoard);
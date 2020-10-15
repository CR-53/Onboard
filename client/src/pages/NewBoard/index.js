import React from "react";
import "./style.css";
import UserStore from "../../stores/UserStore";
import InputField from "../../components/InputField";
import SubmitButton from "../../components/SubmitButton";
import { observer } from "mobx-react";
import API from "../../utils/API";

class NewBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectDescription: '',
            owner: ''
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
            projectName: '',
            projectDescription: ''
        })
    }

    // async saveNewBoard() {
    //     if (!this.state.projectName) {
    //         console.log(`no project name`)
    //         return;
    //     }
    //     if (!this.state.projectDescription) {
    //         console.log(`no project description`)
    //         return;
    //     }
    //     if (!this.state.owner) {
    //         console.log(UserStore.username)
    //         console.log(`no owner - user is not logged in`)
    //         return;
    //     }

    //     try {
    //         let res = await fetch('/newboard', {
    //             method: 'post',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 projectName: this.state.projectName,
    //                 projectDescription: this.state.projectDescription,
    //                 owner: this.state.owner
    //             })
    //         });

    //         let result = await res.json();
    //         if (result && result.success) {
    //             console.log(`new board created`);
    //             // let newBoardLink = 'add board page id here';
    //             // window.location.href=`/${newBoardLink}`
    //         }

    //         else if (result && result.success === false) {
    //             console.log(`an error occured`)
    //         }
    //     }

    //     catch(e) {
    //         console.log(e);
    //         this.resetForm();
    //     }
    // }

    async saveNewBoard() {
        if (!this.state.projectName) {
            console.log(`no project name`)
            return;
        }
        if (!this.state.projectDescription) {
            console.log(`no project description`)
            return;
        }
        if (!this.state.owner) {
            console.log(UserStore.username)
            console.log(`no owner - user is not logged in`)
            return;
        }
        API.saveBoard({
            projectName: this.state.projectName,
            projectDescription: this.state.projectDescription,
            owner: this.state.owner
          })
            .then(() => console.log(`new board created ` + this.state.projectName + " | " + this.state.projectDescription + " | " + this.state.owner ))
            .then(() => this.resetForm())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="page-heading">Create a new feedback board</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <InputField 
                            type='text'
                            placeholder="Enter your project name"
                            value={this.state.projectName}
                            onChange={ (nameVal) => this.setInputValueName('projectName', nameVal) }
                        />
                        <InputField
                            type='textarea'
                            placeholder="Enter a short description of your project"
                            value={this.state.projectDescription}
                            onChange={ (descriptionVal) => this.setInputValueDescription('projectDescription', descriptionVal) }
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
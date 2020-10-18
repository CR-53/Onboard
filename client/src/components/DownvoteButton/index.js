import React from "react";
import "./style.css";
// import { Button } from 'react-bootstrap';

class DownvoteButton extends React.Component {
    
    render() {
        return (
            <div className="submitButton">
                <button 
                    className='downvote vote-btn btn-background'
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick() }
                >
                    {this.props.text}
                </button>
            </div>
        )
    }
}

export default DownvoteButton;
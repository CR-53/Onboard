import React from "react";
import "./style.css";
// import { Button } from 'react-bootstrap';

class DownvoteButton extends React.Component {
    
    render() {
        return (
                <button 
                    className='downvote vote-btn btn-background'
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick() }
                >
                    {this.props.text}
                </button>
        )
    }
}

export default DownvoteButton;
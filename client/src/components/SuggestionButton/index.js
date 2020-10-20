import React from "react";
import "./style.css";
// import { Button } from 'react-bootstrap';

class SuggestionButton extends React.Component {
    
    render() {
        return (
                <button 
                    className='suggestion-btn btn-background'
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick() }
                >
                    {this.props.text}
                </button>
        )
    }
}

export default SuggestionButton;
import React from "react";
import "./style.css";
// import { Button } from 'react-bootstrap';

class SubmitButton extends React.Component {
    
    render() {
        return (
            <div className="submitButton">
                <button 
                    className='submit-btn'
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick() }
                >
                    {this.props.text}
                </button>

            </div>
        )
    }
}

export default SubmitButton;
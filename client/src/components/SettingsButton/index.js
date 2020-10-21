import React from "react";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SettingsButton extends React.Component {
    
    render() {
        return (
                <button 
                    className='settings-btn btn-background'
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick() }
                >
                    <FontAwesomeIcon icon="ellipsis-v" />
                </button>
        )
    }
}

export default SettingsButton;
import React from "react";
import "./style.css";

class SortButton extends React.Component {
    
    render() {
        return (
                <button 
                    className='sort-btn btn-background'
                    disabled={this.props.disabled}
                    onClick={ () => this.props.onClick() }
                >
                    {this.props.text}
                </button>
        )
    }
}

export default SortButton;
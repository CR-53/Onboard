import React from "react";
import "./style.css";

class TextBox extends React.Component {
    render() {
        return (
            <div className="inputField">
                <textarea
                    className="input textarea"
                    type="textarea"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={ (e) => this.props.onChange(e.target.value) }
                />   
            </div>
        )
    }
}
export default TextBox;
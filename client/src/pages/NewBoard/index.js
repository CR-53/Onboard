import React from "react";
import "./style.css";
import { Form, Button} from 'react-bootstrap';

function NewBoard() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-heading">Create a New Project Feedback Board</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Form>
                        <Form.Group controlId="new-project-board">
                            <Form.Label>What is your project called?</Form.Label>
                            <Form.Control type="text" placeholder="Project Name" />
                            <br />
                            <Form.Label>What is your project about?</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                            <Button variant="primary" type="submit">Create Board</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default NewBoard;
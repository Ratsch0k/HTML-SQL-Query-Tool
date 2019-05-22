import React from 'react';
import * as ReactDOM from "react-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

class QueryInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        // Bind functions to object
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRequest = this.props.onRequest;

        // Initialize state
        this.state = {
            size: 'lg',
            first: true,
            className: 'mb-3 mt-5',
            value: '',
        };
    }

    // Handle submit of sql command
    handleSubmit(event) {
        // Prevent site from refreshing
        event.preventDefault();

        this.handleRequest(this.state.value);

        // If first submit, change state so animation plays
        if (this.state.first) {
            this.setState({size: '', first: false, className: 'mb-1 mt-1'});
        }

        // Reset input
        this.setState({value: ''});
    }
    // Handles user input in query textfield
    handleChange(event){
        // Set state to input
        this.setState({value: event.target.value});
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <InputGroup className={this.state.className} size={this.state.size} id='query-input'>
                    <Form.Control id='query-command'
                                  placeholder='PostgreSQL Query Command'
                                  aria-describedby='query-button'
                                  value={this.state.value}
                                  onChange={this.handleChange}
                                  autoFocus/>
                    <InputGroup.Append>
                        <Button variant='outline-success'
                                onClick={this.handleSubmit} type="button">Run</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        );
    }
}

export default QueryInput;
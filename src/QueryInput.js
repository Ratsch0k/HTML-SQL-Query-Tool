import React from 'react';
import * as ReactDOM from "react-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import {TextField} from "@material-ui/core";

class QueryInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        // Bind functions to object
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRequest = this.props.onRequest;

        // Initialize state
        this.state = {
            value: '',
        };
    }

    // Handle submit of sql command
    onSubmit(event) {
        // Prevent site from refreshing
        event.preventDefault();

        this.handleRequest(this.state.value);

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
            <form onSubmit={this.onSubmit} noValidate>
                <FormControl onSubmit={this.onSubmit} variant="standard" fullWidth>
                        <TextField id='query-command'
                               fullWidth
                               placeholder='PostgreSQL Query Command'
                               aria-describedby='query-button'
                               value={this.state.value}
                               onChange={this.handleChange}
                                   variant="outlined"
                               InputProps={{
                                       endAdornment: (<InputAdornment>
                                           <Button color='primary' variant="contained" onClick={this.onSubmit} type='button'>Run</Button>
                                       </InputAdornment>),
                                   style: {
                                           fontSize: "large"
                                   },
                                   }}
                               autoFocus/>
                </FormControl>
            </form>
        );
    }
}

export default QueryInput;
import React from 'react';
import Alert from 'react-bootstrap/Alert';

const error404Msg = 'Server is currently not available';
const error400Msg = 'Your query was not valid. Please look for any errors in your query';
const errorDefaultMsg = 'An error occurred';

class QueryAlert extends React.Component {
    constructor(props){
        super(props);
        this.createErrorMessage = this.createErrorMessage.bind(this);
    }

    // Create error message for the given error code
     createErrorMessage(error){
        if (error === null){
            return null;
        };

        let status = error.status;
        let msg;

        // Check which error status was send back and create alert message
        switch(status) {
            case 404: msg = error404Msg;
                break;
            case 400: msg = error400Msg;
                break;
            default: msg = errorDefaultMsg;
        }
        return msg;
    }

    render() {
        return(
        <Alert variant='danger' show={this.props.show} onClick={this.props.onClick} dismissible>
            <p className='center'>{this.createErrorMessage(this.props.error)}</p>
        </Alert>
        );
    }
}

export default QueryAlert;
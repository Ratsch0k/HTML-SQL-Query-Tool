import React from 'react';
import Alert from 'react-bootstrap/Alert';

class QueryAlert extends React.Component {
    constructor(props){
        super(props);
        this.createErrorMessage = this.createErrorMessage.bind(this);
    }

    // Create error message for the given error code
    createErrorMessage(status){
        let msg;

        switch(status) {
            case 404: msg = 'Server is currently not available';
                break;
            default: msg = 'An error occurred'
        }
        return msg;
    }

    render() {
        return(
        <Alert variant='danger' show={this.props.show}>
            <p>{this.createErrorMessage(this.props.status)}</p>
        </Alert>
        );
    }
}

export default QueryAlert;
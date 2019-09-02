import React from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Form noValidate onSubmit={this.props.handleLogin}>
                <Modal.Header>
                    <Modal.Title>
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Form.Row} controlId="formUsername">
                        <Form.Label column sm={2}>Username</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={this.props.username}
                                          onChange={(event) => {
                                              this.props.handleChange(event, "username")
                                          }}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Form.Row} controlId="formPassword">
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" value={this.props.password}
                                          onChange={(event) => {
                                              this.props.handleChange(event, "password")
                                          }}/>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" disabled={this.props.disabled}
                            onClick={this.props.toggleLoginType}>Sign Up</Button>
                    <Button type="submit" disabled={this.props.disabled}>Submit</Button>
                </Modal.Footer>
            </Form>
        );
    }
}

export default LoginForm;
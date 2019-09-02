import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class SignUpForm extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Form noValidate onSubmit={this.props.handleSignUp}>
                <Modal.Header>
                    <Modal.Title>
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Form.Row} controlId="formEmail">
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" value={this.props.email}
                                          onChange={(event) => {
                                              this.props.handleChange(event, "email");
                                          }}/>
                        </Col>
                    </Form.Group>
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
                            onClick={this.props.toggleLoginType}>Login</Button>
                    <Button type="submit" disabled={this.props.disabled}>Submit</Button>
                </Modal.Footer>
            </Form>
        );
    }

}

export default SignUpForm;
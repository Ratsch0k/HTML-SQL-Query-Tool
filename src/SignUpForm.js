import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import Modal from "react-bootstrap/Modal";
import {Dialog, FormControl} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Container from "@material-ui/core/Container"

class SignUpForm extends React.Component{
    constructor(props) {
        super(props);
    }

    /*
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
    */

    render() {
        return (
            <Container>
                <DialogTitle id="form-dialog-signup-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To signup please enter a valid email, a username of your choice and a password to secure your account
                    </DialogContentText>
                    <form noValidate onSubmit={this.props.handleSignUp}>
                        <FormControl error={this.props.valid} fullWidth margin="normal">
                            <TextField margin="normal" id="form-signup-email" type="email" autoFocus placeholder="Email"
                                       value={this.props.email}
                                       onChange={(event) => {
                                           this.props.handleChange(event, "email")
                                       }}
                                       error={this.props.error}/>
                            <TextField margin="normal" id="form-signup-username" type="text" placeholder="Username"
                                       value={this.props.username}
                                       onChange={(event) => {
                                           this.props.handleChange(event, "username")
                                       }}
                                       error={this.props.error}/>
                            <TextField margin="normal" id="form-signup-password" type="password"placeholder="Password"
                                       value={this.props.password}
                                       onChange={(event) => {
                                           this.props.handleChange(event, "password")
                                       }}
                                       error={this.props.error}/>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={this.props.toggleLoginType}>Login</Button>
                            <Button color="primary" type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Container>
        );
    }
}

export default SignUpForm;
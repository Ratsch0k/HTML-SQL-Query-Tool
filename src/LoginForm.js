import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {FormControl} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }

    /*
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
    */

    render() {
        return (
            <Container>
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To use this website please login. If you don't have an account please click on signup and create one
                    </DialogContentText>
                    <form noValidate onSubmit={this.props.handleLogin}>
                        <FormControl fullWidth margin="normal">
                         <TextField margin="normal" id="form-login-username" type="text" autoFocus placeholder="Username"
                                    value={this.props.username}
                                    onChange={(event) => {
                                        this.props.handleChange(event, "username")
                                    }}
                                    error={this.props.error}
                                    label={this.props.error ? "Username or Password wrong" : false}/>
                         <TextField margin="normal" id="form-login-password" type="password"placeholder="Password"
                                    value={this.props.password}
                                    onChange={(event) => {
                                        this.props.handleChange(event, "password")
                                    }}
                                    error={this.props.error}/>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={this.props.toggleLoginType}>Signup</Button>
                            <Button color="primary" type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Container>
        );
    }
}

export default LoginForm;
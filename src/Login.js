import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const axios = require("axios");

class Login extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            show: props.show,
            username: undefined,
            password: undefined,
            valid: false,
            disabled: false
        };
    }

    handleSubmit(event){
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        if(typeof username !== "undefined" && typeof password !== "undefined"){
            this.setState({disabled: true});
            axios({
                method: "post",
                url: "http://localhost:4000/login",
                auth: {
                    username: username,
                    password: password
                }
            }).then(() => {
                this.setState({disabled: false, show: false});
            }).catch((err) => {
               this.setState({disabled: false});
               console.log(err.message);
            });
        } else {
            console.log("Insufficient Input");
        }
    }


    handleClose(){
        this.setState({show: false});
    }

    handleChange(event, propertyName) {
        let value = event.target.value;
        let newState = {};
        newState[propertyName] = value;

        this.setState(newState);
    }

    render() {
        return(
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
              <Form noValidate onSubmit={(event) => this.handleSubmit(event)}>
              <Modal.Header>
                  <Modal.Title>
                      Login
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form.Group as={Form.Row} controlId="formUsername">
                      <Form.Label column sm={2}>Username</Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" value={this.state.username}
                            onChange={(event) => {this.handleChange(event, "username")}}/>
                      </Col>
                  </Form.Group>
                  <Form.Group as={Form.Row} controlId="formPassword">
                      <Form.Label column sm={2}>Password</Form.Label>
                      <Col sm={10}>
                          <Form.Control type="password" value={this.state.password}
                            onChange={(event) => {this.handleChange(event, "password")}}/>
                      </Col>
                  </Form.Group>

                 </Modal.Body>
                <Modal.Footer>
                 <Button variant="secondary" disabled={this.state.disabled}
                         onClick={() => this.handleClose()}>Close</Button>
                    <Button type="submit" disabled={this.state.disabled}>Submit</Button>
                </Modal.Footer>
              </Form>
          </Modal>
        );
    }
}

export default Login;
import React from "react";
import Modal from "react-bootstrap/Modal";
import config from "./config";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const axios = require("axios").create({
    timeout: 2000
});

class Login extends React.Component{
    constructor(props, context){
        super(props, context);

        this.state = {
            show: props.show,
            username: undefined,
            email: undefined,
            password: undefined,
            valid: false,
            disabled: false,
            loginSelected: false,
        };
    };

    handleLogin = (event) => {
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        if(typeof username !== "undefined" && typeof password !== "undefined"){
            let token = Buffer.from(`${username}:${password}`).toString("base64");
            this.setState({disabled: true});
            axios({
                method: "post",
                url: `http://${config.host}:${config.port}/login`,
                headers: {
                    "Authorization": "Basic " + token
                }
            }).then((res) => {
                console.log(res.data);
                this.setState({disabled: false, show: false});
            }).catch((err) => {
               this.setState({disabled: false});
               console.log(err.message);
            });
        } else {
            console.log("Insufficient Input");
        }
    };

    handleSignUp = (event) => {
        event.preventDefault();

        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password;

        if(typeof username !== "undefined" && typeof email !== "undefined" && typeof password !== "undefined"){
            let body = {
                email: email.toString(),
                username: username.toString(),
                password: password.toString()
            };
            this.setState({disabled: true});
            axios({
                method: "post",
                url: `http://${config.host}:${config.port}/signup`,
                data: body
            }).then(res => {
                console.log(res.data);
                this.setState({disabled: false});
            }).catch(err => {
                console.log(err.message);
                this.setState({disabled: false});
            });
        }
    };


    handleClose = () => {
        this.setState({show: false});
    };

    handleChange = (event, propertyName) => {
        let value = event.target.value;
        let newState = {};
        newState[propertyName] = value;

        this.setState(newState);
    };

    toggleLoginType = () => {
        let isLogin = this.state.loginSelected;
        this.setState({loginSelected: !isLogin});
    };

    render() {
        let form;

        if(this.state.loginSelected){
            form = <LoginForm handleLogin={this.handleLogin} handleChange={this.handleChange}
                              username={this.state.username} password={this.state.password}
                              disabled={this.state.disabled} toggleLoginType={this.toggleLoginType}/>;
        }else {
            form = <SignUpForm handleSignUp={this.handleSignUp} handleChange={this.handleChange}
                               username={this.state.username} password={this.state.password}
                               email={this.state.email} disabled={this.state.disabled}
                               toggleLoginType={this.toggleLoginType}/>;
        }


        return (
            <Modal show={this.state.show}>
                {form}
            </Modal>
        );
    };

}

export default Login;
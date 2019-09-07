import React from "react";
import Modal from "react-bootstrap/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
            username: undefined,
            email: undefined,
            password: undefined,
            error: false,
            disabled: false,
            loginSelected: true,
        };
    };

    handleLogin = (event) => {
        event.preventDefault();

        let username = this.state.username;
        let password = this.state.password;
        if(typeof username !== "undefined" || typeof password !== "undefined"){
            let token = Buffer.from(`${username}:${password}`).toString("base64");
            this.setState({disabled: true});
            axios({
                method: "post",
                url: `http://${config.host}:${config.port}/login`,
                headers: {
                    "Authorization": "Basic " + token
                },
                withCredentials: true
            }).then((res) => {
                console.log(res.data);
                this.giveUserDataToSuper(res.data.userData);
                this.props.closeLogin();
                this.setState({disabled: false, username: undefined, email: undefined, password: undefined, error: false});
            }).catch((err) => {
               this.setState({disabled: false, password: "", error: true});
               console.log(err.message);
            });
        } else {
            this.setState({error: true});
            console.log("Insufficient Input");
        }
    };

    handleSignUp = (event) => {
        event.preventDefault();

        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password;

        if(typeof username !== "undefined" || typeof email !== "undefined" || typeof password !== "undefined"){
            let body = {
                email: email.toString(),
                username: username.toString(),
                password: password.toString()
            };
            this.setState({disabled: true});
            axios({
                method: "post",
                url: `http://${config.host}:${config.port}/signup`,
                data: body,
                withCredentials: true
            }).then(res => {
                console.log(res.data);
                this.giveUserDataToSuper(res.data.userData);
                this.props.closeLogin();
                this.setState({disabled: false, username: undefined, email: undefined, password: undefined, error: false});
            }).catch(err => {
                console.log(err.message);
                this.setState({disabled: false, password: "", error: true});
            });
        } else {
            console.log("Insufficient Input");
            this.setState({error: true})
        }
    };

    giveUserDataToSuper(userData){
        if(typeof userData !== "undefined"){
            this.props.setUserData(userData);
        } else {
            console.log("Could not give user data to higher objects");
        }
    };


    handleChange = (event, propertyName) => {
        let value = event.target.value;
        let newState = {};
        newState[propertyName] = value;

        this.setState(newState);
    };

    toggleLoginType = () => {
        let isLogin = this.state.loginSelected;
        this.setState({loginSelected: !isLogin, error: false});
    };

    render() {
        let form;

        if(this.state.loginSelected){
            form = <LoginForm handleLogin={this.handleLogin} handleChange={this.handleChange}
                              username={this.state.username} password={this.state.password}
                              disabled={this.state.disabled} toggleLoginType={this.toggleLoginType}
                                open={this.props.show} error={this.state.error}/>;
        }else {
            form = <SignUpForm handleSignUp={this.handleSignUp} handleChange={this.handleChange}
                               username={this.state.username} password={this.state.password}
                               email={this.state.email} disabled={this.state.disabled}
                               toggleLoginType={this.toggleLoginType} open={this.props.show}
                                error={this.state.error}/>;
        }


        return (
            <Dialog open={this.props.show} fullWidth>
                {form}
            </Dialog>
        );
    };

}

export default Login;
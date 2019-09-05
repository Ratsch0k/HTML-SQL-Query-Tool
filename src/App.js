import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QueryInput from './QueryInput';
import QueryAlert from './QueryAlert';
import QueryTable from './QueryTable';
import config from './config';
import Login from "./Login";
import Button from "react-bootstrap/Button";

const historyLength = 5;
const host = config.host;
const apiPort = config.port;
const axios = require('axios');

class App extends React.Component {
  constructor(props){
    super(props);

    this.requestData = this.requestData.bind(this);
    this.onAlertClose = this.onAlertClose.bind(this);
    this.addQueryToHistory = this.addQueryToHistory.bind(this);
    this.axiosGetRequest = this.axiosGetRequest.bind(this);

    this.state = {
      queryCurrent: '',
      queryHistory: [],
      showAlert: false,
      error: null,
      data: null,
      userData: null,
      showLogin: true,
    };
  }

  componentWillMount() {
    axios({
      method: "post",
      url: `http://${host}:${apiPort}/login`,
      withCredentials: true
    }).then(res => {
      if(res.status === 200){
        this.setState({userData: res.data, showLogin: false});
      }
    });
  }

  // Request data with the given queryInput
  requestData(queryInput){
    this.addQueryToHistory(queryInput);
    this.axiosGetRequest(queryInput);
  }

  // Add query to history and set state
  addQueryToHistory(queryInput){
    const history = this.state.queryHistory;
    // Update state
    this.setState({queryCurrent: queryInput, queryHistory: history.concat([queryInput])});
    // Limit capacity of history
    if(this.state.queryHistory.length >= historyLength) {
      this.setState({queryHistory: history.splice(0, 1)});
    }
  }

  // Send get request to api
  axiosGetRequest(queryInput){
    // Bind'self to this, this in request is in different scope
    let options = {
      withCredentials: true
    };
    let self = this;
    axios.get(`http://${host}:${apiPort}/query?q=` + queryInput, options)
        .then(function (res) {
          console.log(res.data);
          // Set data to a positive response
          self.setState({showAlert: false, data: res.data})
        })
        .catch(function (error) {
          if(error.response) {
            self.setState({showAlert: true, error: error.response, data: null})
          }else if(error.request){
            self.setState({showAlert: true, error: error.request, data: null})
          }else{
            console.log(error);
          }
        });
  }

  /**
   * Sets the userData (saved in state) to the object in the parameter userData
   * The object should contain a name and email address, if user is an admin it should also contain an admin
   * property with value true
   *
   * @method setUserData
   * @param {Object} userData   New user data
   */
  setUserData = (userData) => {
    console.log(`set user data to -> ${userData}`);
    this.setState({userData: userData});
  };

  // onClick function for dismissible alert
  onAlertClose () {
    this.setState({showAlert: false});
  };

  logOut = (event) => {
    event.preventDefault();
    // Request deletion of authentication cookie
    axios({
      method: "post",
      url: `http://${host}:${apiPort}/logout`,
      withCredentials: true,
    }).then(() => {
      this.setState({userData: null, showLogin: true});
    });
  };

  closeLogin = () => {
    this.setState({showLogin: false});
  };

  render() {
    let loggedUser;
    if(this.state.userData !== null && this.state.userData.username !== null){
      loggedUser = `${this.state.userData.username}.\tLog out?`;
    } else {
      loggedUser = "Not logged in";
    }
    let loggedUserField = <a onClick={this.logOut} href=""><strong>{loggedUser}</strong></a>;

    return (
        <>
        <Login show={this.state.showLogin} setUserData={this.setUserData} closeLogin={this.closeLogin}/>
        <Container fluid>
          <Row>
            <Col lg={2} md={2}/>
            <Col lg={8} md={8}>
              <h1 id='heading' className='center'><strong>PostgreSQL Query Tool</strong></h1>
            </Col>
            <Col lg={2} md={2}>
              {loggedUserField}
            </Col>
          </Row>
            <Row>
            <Col lg={3} md={1} xs={0}/>
            <Col lg={6} md={10}>
              <QueryInput onRequest={this.requestData}/>
            </Col>
            <Col lg={3} md={1} xs={0}/>
          </Row>
          <Container id='table-area'>
            <hr />
            <QueryAlert show={this.state.showAlert} error={this.state.error} onClick={this.onAlertClose}/>
            <div className='center'>{this.state.queryHistory.length > 0 ?
                <span className='query-desc'>Current query: <span className='query'>{this.state.queryCurrent}</span></span> : null}</div>
                <QueryTable data={this.state.data}/>
          </Container>
        </Container>
        </>
    );
  }
}

export default App;

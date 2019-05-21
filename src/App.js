import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QueryInput from './QueryInput';
import QueryAlert from './QueryAlert';

const historyLength = 5;
const host = '192.168.2.100';
const apiPort = '80';

class App extends React.Component {
  constructor(props){
    super(props);

    this.requestData = this.requestData.bind(this);
    this.onAlertClose = this.onAlertClose.bind(this);

    this.state = {
      queryCurrent: '',
      queryHistory: [],
      showAlert: false,
      error: null,
    };
  }

  requestData(queryInput){
    const history = this.state.queryHistory;
    // Update state
    this.setState({queryCurrent: queryInput, queryHistory: history.concat([queryInput])});
    // Limit capacity of history
    if(this.state.queryHistory.length >= historyLength) {
      this.setState({queryHistory: history.splice(0, 1)});
    }

    // Bind'self to this, this in request is in different scope
    let self = this;
    const axios = require('axios');
    axios.get(`http://${host}:${apiPort}/query?q=` + queryInput)
        .then(function (res) {
          console.log(res.data);
          self.setState({showAlert: false})
        })
        .catch(function (error) {
          if(error.response) {
            self.setState({showAlert: true, error: error.response})
          }else if(error.request){
            self.setState({showAlert: true, error: error.request})
          }else{
            console.log(error);
          }
        });
  }

  // onClick function for dismissible alert
  onAlertClose () {
    this.setState({showAlert: false});
  };

  render() {
    return (
        <Container fluid>
          <h1 id='heading' className='center'><strong>PostgreSQL Query Tool</strong></h1>
          <Row>
            <Col lg={3} md={1} xs={0}/>
            <Col lg={6} md={10}>
              <QueryInput onRequest={this.requestData}/>
            </Col>
            <Col lg={3} md={1}xs={0}/>
          </Row>
          <Container id='table-area'>
            <hr />
            <QueryAlert show={this.state.showAlert} error={this.state.error} onClick={this.onAlertClose}/>
            <div className='center'>{this.state.queryHistory.length > 0 ?
                <span className='query-desc'>Last query: <span className='query'>{this.state.queryCurrent}</span></span> : null}</div>
          </Container>
        </Container>
    );
  }
}

export default App;

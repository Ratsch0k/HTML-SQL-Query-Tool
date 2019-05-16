import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QueryInput from './QueryInput';
import QueryAlert from './QueryAlert';

const historyLength = 5;

class App extends React.Component {
  constructor(props){
    super(props);

    this.requestData = this.requestData.bind(this);

    this.state = {
      queryCurrent: '',
      queryHistory: [],
      showAlert: false,
      errorStatus: null,
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

    // Send query as get request to node server
    let errorOccurred = false;
    let errorStatus = null;
    const axios = require('axios');
    axios.get('/query?q=' + queryInput)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          if(error.response) {
            errorStatus = error.response.status;
            console.log('Server Responded with ' + errorStatus);
          }else if(error.request){
            console.log('No response: ' + errorStatus);
            errorStatus = error.request;
          }else{
            console.log(error);
          }
          errorOccurred = true;
        });
    // If error occurred set state so that alert shows
    if(errorOccurred){
      this.setState({showAlert: true, errorStatus: errorStatus})
    }else {
      this.setState({showAlert: false});
    }
  }
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
            {this.state.showAlert ? <QueryAlert/> : null}
            <div className='center'>{this.state.queryHistory.length > 0 ?
                <span className='query-desc'>Last query: <span className='query'>{this.state.queryCurrent}</span></span> : null}</div>
          </Container>
        </Container>
    );
  }
}

export default App;

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as ReactDOM from "react-dom";

function App() {
  return (
    <Container fluid>
      <h1 id='heading'><strong>PostgreSQL Query Tool</strong></h1>
      <Row>
        <Col lg={3} md={1} xs={0}></Col>
        <Col lg={6} md={10}>
          <QueryInput />
        </Col>
        <Col lg={3} md={1}xs={0}></Col>
      </Row>
      <Container id='table-area'>
        <hr />
      </Container>
    </Container>
  );
}

class QueryInput extends React.Component {
  constructor(props, context){
    super(props, context);

    // Bind functions to object
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // Initialize state
    this.state = {
      size: 'lg',
      first: true,
      className:'mb-3 mt-5',
      value: '',
    };
  }

  // Handle submit of sql command
  handleSubmit(event) {
    // Prevent site from refreshing
    event.preventDefault();

    // If first submit, change state so animation plays
    if (this.state.first) {
      this.setState({size: '', first: false, className: 'mb-1 mt-1'});
    }

    // Send query as get request to node server
    const axios = require('axios');
    axios.get('/query?C=' + this.state.value)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });

    // Reset input
    this.setState({value: ''});
  }


  // Handles user input in query textfield
  handleChange(event){
    // Set state to input
    this.setState({value: event.target.value});
  }

  // Hanlde operations for componentDidMount part of lifecycle
  componentDidMount() {
    // Focus on query input
    ReactDOM.findDOMNode(this.refs.queryInput).focus();
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <InputGroup className={this.state.className} size={this.state.size} id='query-input'>
          <Form.Control id='query-command'
            placeholder='PostgreSQL Query Command'
            aria-describedby='query-button'
            value={this.state.value}
            onChange={this.handleChange}
            ref='queryInput'/>
          <InputGroup.Append>
            <Button variant='outline-success'
              onClick={this.handleSubmit} type="button">Run</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

class QueryAlert extends React.Component {
  constructor(props){
    super(props);

  }
}

export default App;

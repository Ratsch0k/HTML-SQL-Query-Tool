import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <Container fluid>
      <h1 id='heading'><strong>PostgrSQL Query Tool</strong></h1>
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

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      size: 'lg',
      first: true,
      className:'mb-3 mt-5',
    };
  }

  handleSubmit(){
    if(this.state.first){
      this.setState({size:'sm', first: false, className: 'mb-1 mt-1'});
    }
  }

  render() {
    return(
      <div>
        <InputGroup className={this.state.className} size={this.state.size} id='query-input'>
          <Form.Control id='query-command'
            placeholder='PostgrSQL Query Command'
            aria-describedby='query-button'/>
          <InputGroup.Append>
            <Button variant='outline-success'
              onClick={this.handleSubmit} type="submit">Submit</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default App;

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col>
          <AlertClosable />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <p>Here should be displayed text</p>
          <hr />
          <p>Here should be more text</p>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

class AlertClosable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: true };
  }

  render() {
    const handleClose = () => this.setState({ show: false });

    return (
    <Alert show={this.state.show}  variant='warning' dismissible onClose={handleClose}>
      <Alert.Heading>Only For Development</Alert.Heading>
      This is only a test site for testing architecture currently used in development
    </Alert>
  );
  }
}

export default App;

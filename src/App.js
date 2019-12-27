import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <Container fluid>
      <Row style={{ height: '100vh' }}>
        <Col md={3} className="col-md-3 bg-dark text-white p-0">
          <Sidebar />
        </Col>
        <Col md={9} className="col-md-9 p-0">
          b
        </Col>
      </Row>
    </Container>
  );
}

export default App;

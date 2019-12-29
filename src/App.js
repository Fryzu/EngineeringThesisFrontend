import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Channel from './components/channel/Channel';
import LoginPage from './components/Auth/LoginPage';

class App extends Component {
  state = {
    loggedIn: false,
  };

  render() {
    const { loggedIn } = this.state;

    return (
      <Container id="bootstrap-overrides" fluid>
        {loggedIn ? (
          <Row style={{ height: '100vh' }}>
            <Col
              md={3}
              className="overflow-auto mh-100 col-md-3 bg-dark text-white p-0">
              <Sidebar />
            </Col>
            <Col md={9} className="col-md-9 p-0">
              <Topbar />
              <Channel />
            </Col>
          </Row>
        ) : (
          <LoginPage
            onLogin={() => {
              this.setState({ loggedIn: true });
            }}
          />
        )}
      </Container>
    );
  }
}

export default App;

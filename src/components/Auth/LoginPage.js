import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import { testAction } from '../../actions/user';

class LoginPage extends Component {
  render() {
    const { onLogin, testData } = this.props;

    return (
      <Container className="col-md-4 mx-auto mt-5">
        <h2>Hello! :)</h2>
        <p>{testData ? 'tak' : 'nie'}</p>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              This will be your name in the system.
            </Form.Text>
          </Form.Group>
          <Button onClick={onLogin} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    testData: state.user.testData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    testAction: testData => dispatch(testAction(testData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import { testAction, addUser } from '../../actions/user';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
    };
  }

  onChange = event => {
    this.setState({ userName: event.target.value });
  };

  onSubmit = () => {
    const { userName } = this.state;
    const { addUserAction } = this.props;

    if (userName) {
      addUserAction(userName);
    } else {
      alert('Please enter correct name');
    }
  };

  render() {
    const { testData } = this.props;
    const { userName } = this.state;

    return (
      <Container className="col-md-4 mx-auto mt-5">
        <h2>Hello! :)</h2>
        <p>{testData}</p>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={userName}
              onChange={this.onChange}
              type="text"
              placeholder="Enter your username"
            />
            <Form.Text className="text-muted">
              It will be your name in the system.
            </Form.Text>
          </Form.Group>
          <Button onClick={this.onSubmit} variant="primary" type="button">
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
    addUserAction: userName => dispatch(addUser(userName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

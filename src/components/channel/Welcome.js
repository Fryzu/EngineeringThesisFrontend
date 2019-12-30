import React, { Component } from 'react';
import { Jumbotron, Button, Form, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { openChannel } from '../../actions/user';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channelName: '',
    };
  }

  onChange = event => {
    this.setState({ channelName: event.target.value });
  };

  onSubmit = () => {
    const { channelName } = this.state;
    const { openChannelAction } = this.props;

    if (channelName) {
      openChannelAction(channelName);
    } else {
      alert('Please enter channel name');
    }
  };

  render() {
    const { channelName } = this.state;

    return (
      <>
        <Jumbotron className="bg-white mb-3 shadow">
          <h1 className="display-4 mb-3">Create new channel</h1>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Channel name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  value={channelName}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Name"
                />
              </Col>
            </Form.Group>
            <p>
              <Button onClick={this.onSubmit} variant="primary" type="button">
                Create channel
              </Button>
            </p>
          </Form>
        </Jumbotron>
        <Jumbotron className="bg-white mb-3 shadow">
          <h1 className="display-4">Engenering Thesis</h1>
          <p>
            Web app for my engineering thesis project - System for WebRTC based
            video broadcasting.
          </p>
        </Jumbotron>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    channelName: state.user.channelName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openChannelAction: channelName => dispatch(openChannel(channelName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

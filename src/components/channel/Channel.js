import React, { Component } from 'react';
import { Accordion, Card, Button, Container } from 'react-bootstrap';
import { FaCogs, FaPlayCircle, FaComments } from 'react-icons/fa';
import { connect } from 'react-redux';
import ChannelSettings from './ChannelSettings';
import ChannelStream from './ChannelStream';
import ChannelChat from './ChannelChat';
import Welcome from './Welcome';
import { closeChannel } from '../../actions/user';
import { sendToChannel } from '../../actions/server';

class Channel extends Component {
  onCloseChannel = () => {
    const { closeChannelAction } = this.props;

    closeChannelAction();
  };

  onResetChannel = () => {
    const { sendToChannelAction } = this.props;

    sendToChannelAction('typeeee', 'messsaggeeee');
  };

  render() {
    const { channelName, channelOwner } = this.props;
    if (channelName) {
      return (
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <FaCogs /> Settings
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <ChannelSettings
                channelOwner={channelOwner}
                onCloseChannel={this.onCloseChannel}
                onResetChannel={this.onResetChannel}
              />
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <FaPlayCircle /> Stream
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <ChannelStream />
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                <FaComments /> Chat
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <ChannelChat />
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
    } else {
      return (
        <Container className="p-3">
          <Welcome />
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
    channelName: state.user.channelName,
    channelOwner: state.user.channelOwner,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeChannelAction: () => dispatch(closeChannel()),
    sendToChannelAction: (messageType, message) =>
      dispatch(sendToChannel(messageType, message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);

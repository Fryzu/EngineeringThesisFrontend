import React, { Component } from 'react';
import { Accordion, Container } from 'react-bootstrap';
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

  setupWebRTCConnection = () => {};

  render() {
    const { channelName, channelOwner } = this.props;
    if (channelName) {
      return (
        <Accordion defaultActiveKey="0">
          <ChannelSettings
            channelOwner={channelOwner}
            onCloseChannel={this.onCloseChannel}
            onResetChannel={this.onResetChannel}
            onStartStreaming={this.setupWebRTCConnection}
          />
          <ChannelStream />
          <ChannelChat />
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

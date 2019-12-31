import React, { Component } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChannelSettings from './ChannelSettings';
import ChannelStream from './ChannelStream';
import ChannelChat from './ChannelChat';
import Welcome from './Welcome';
import { closeChannel } from '../../actions/user';
import { sendToChannel, getChannelListeners } from '../../actions/server';

class Channel extends Component {
  onCloseChannel = () => {
    const { closeChannelAction } = this.props;

    closeChannelAction();
  };

  onResetChannel = () => {
    const { sendToChannelAction } = this.props;

    sendToChannelAction('typeeee', 'messsaggeeee');
  };

  setupWebRTCConnection = () => {
    const { channelName, getChannelListenersAction } = this.props;

    getChannelListenersAction(channelName);
    // console.warn(this.previewRef);
    // this.refs.previewRef.play();
  };

  render() {
    const { channelName, channelOwner, listeners } = this.props;
    if (channelName) {
      return (
        <Accordion defaultActiveKey="0">
          <ChannelSettings
            listeners={listeners}
            channelOwner={channelOwner}
            onCloseChannel={this.onCloseChannel}
            onResetChannel={this.onResetChannel}
            onStartStreaming={this.setupWebRTCConnection}
          />
          <ChannelStream>
            <div className="flexChild p-3" id="camera-container">
              <video ref="previewRef" width="100%">
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
              </video>
            </div>
          </ChannelStream>
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
    listeners: state.server.listeners,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeChannelAction: () => dispatch(closeChannel()),
    sendToChannelAction: (messageType, message) =>
      dispatch(sendToChannel(messageType, message)),
    getChannelListenersAction: channelName =>
      dispatch(getChannelListeners(channelName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);

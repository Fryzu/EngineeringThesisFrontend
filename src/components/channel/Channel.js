import React, { Component } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChannelSettings from './ChannelSettings';
import ChannelStream from './ChannelStream';
import ChannelChat from './ChannelChat';
import Welcome from './Welcome';
import { closeChannel } from '../../actions/user';
import {
  sendToChannel,
  getChannelListeners,
  sendToUser,
} from '../../actions/server';
import WebRTCController from '../../api/WebRTCController';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.webRTCController = React.createRef();
  }

  onCloseChannel = () => {
    const { closeChannelAction } = this.props;

    closeChannelAction();
  };

  onResetChannel = () => {
    const { sendToChannelAction } = this.props;

    sendToChannelAction('typeeee', 'messsaggeeee');
  };

  startStreaming = () => {
    const { previewRef } = this.refs;

    this.webRTCController.current.getUserMediaStream(previewRef);
  };

  render() {
    const {
      channelOwner,
      listeners,
      sendToUserAction,
      sendToChannelAction,
      userName,
    } = this.props;

    if (channelOwner) {
      return (
        <Accordion defaultActiveKey="0">
          <WebRTCController
            userName={userName}
            channelOwner={channelOwner}
            listeners={listeners}
            sendToUser={sendToUserAction}
            sendToChannel={sendToChannelAction}
            ref={this.webRTCController}
          />
          <ChannelSettings
            listeners={listeners}
            channelOwner={channelOwner}
            onCloseChannel={this.onCloseChannel}
            onResetChannel={this.onResetChannel}
            onStartStreaming={this.startStreaming}
          />
          <ChannelStream>
            <div className="flexChild p-3" id="camera-container">
              <video autoPlay ref="previewRef" width="100%" />
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
    sendToUserAction: (userName, messageType, message) =>
      dispatch(sendToUser(userName, messageType, message)),
    sendToChannelAction: (messageType, message) =>
      dispatch(sendToChannel(messageType, message)),
    getChannelListenersAction: channelName =>
      dispatch(getChannelListeners(channelName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);

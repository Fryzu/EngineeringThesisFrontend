import React, { Component } from 'react';
import Connection from './Connection';

const mediaConstraints = {
  audio: true,
  video: true,
};

const DEBUG = true;

const log = message => {
  DEBUG && console.log('WebRTC:', message);
};

export default class WebRTCController extends Component {
  /** If the WebRTCController is a sender then the startSteam should be executed */
  constructor(props) {
    super(props);

    const { channelOwner, listeners, sendToUser, sendToChannel } = this.props;

    log(`Setting up WebRTC controller with ${listeners}`);

    this.actions = { sendToUser, sendToChannel };

    if (channelOwner) {
      this.connectWithAllListeners(listeners);
    } else {
      this.connectWithChannelAuthor();
    }
  }

  /** Creates connections for all listeners */
  connectWithAllListeners = listeners => {
    this.connections = [];
    listeners.forEach(listener => {
      const connection = new Connection(listener, this.actions.sendToUser);
      this.connections.push(connection);
    });
  };

  connectWithChannelAuthor = () => {
    console.log('connect with author not implemented');
  };

  /** Gets the media stream from user device and connects it to video preview */
  getUserMediaStream = videoRef => {
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(localStream => {
        // eslint-disable-next-line no-param-reassign
        videoRef.srcObject = localStream;
        localStream.getTracks().forEach(track => {
          this.addTrackToAllConnections(track, localStream);
        });
        log('Linked userMediaStream to all connections');
      })
      .catch(error => {
        log(`Media devices error ${error}`);
      });
  };

  addTrackToAllConnections = (track, localStream) => {
    this.connections.forEach(connection => {
      connection.addTrack(track, localStream);
    });
  };

  render() {
    return <></>;
  }
}

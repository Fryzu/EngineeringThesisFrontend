import React, { Component } from 'react';
import Connection, { messageTypes } from './Connection';

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

    const {
      userName,
      channelOwner,
      listeners,
      sendToUser,
      videoRef,
      sendToChannel,
    } = this.props;

    this.actions = { sendToUser, sendToChannel };

    if (userName === channelOwner) {
      log(`Setting up WebRTC controller as sender`);
      this.connectWithAllListeners(listeners);
    } else {
      log(`Setting up WebRTC controller as receiver`);
      this.connectWithChannelAuthor(channelOwner, videoRef);
    }
  }

  async componentDidUpdate(prevProps) {
    const {
      ICECandidates,
      remoteSDP,
      listeners,
      userName,
      channelOwner,
    } = this.props;

    if (ICECandidates !== prevProps.ICECandidates) {
      const newCandidate = ICECandidates.slice(-1)[0];

      this.connections.forEach(connection => {
        if (connection.listener === newCandidate.from) {
          log(`Adding ICE candidate for ${newCandidate.from}`);
          const { peerConnection } = connection;
          newCandidate.candidate &&
            peerConnection.addIceCandidate(newCandidate.candidate);
        }
      });
    }

    if (listeners !== prevProps.listeners) {
      const newListeners = listeners.filter(listener => {
        return !prevProps.listeners.includes(listener);
      });
      newListeners.forEach(listener => {
        const connection = new Connection(listener, this.actions.sendToUser);
        this.connections.push(connection);
      });
    }

    if (remoteSDP && remoteSDP !== prevProps.remoteSDP) {
      const isOwner = userName === channelOwner;

      if (isOwner) {
        await this.connections.forEach(async connection => {
          if (connection.listener === remoteSDP.from) {
            log('Setting remote SDP');

            const { peerConnection } = connection;
            await peerConnection.setRemoteDescription(remoteSDP.sdp);
          }
        });
      } else {
        log('Setting remote SDP and sending reponse', remoteSDP);

        const { peerConnection } = this.connections[0];
        await peerConnection.setRemoteDescription(remoteSDP.sdp);

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        this.actions.sendToUser(channelOwner, messageTypes.SDP_OFFER, {
          sdp: peerConnection.localDescription,
          from: userName,
        });
      }
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

  connectWithChannelAuthor = channelOwner => {
    this.connections = [];
    const connection = new Connection(channelOwner, this.actions.sendToUser);

    connection.peerConnection.ontrack = event => {
      const { videoRef } = this.props;

      if (!videoRef.srcObject) {
        log('Received new track');
        const stream = event.streams[0];
        // eslint-disable-next-line no-param-reassign
        videoRef.srcObject = stream;
      }
    };

    this.connections.push(connection);
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

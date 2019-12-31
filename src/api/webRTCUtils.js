const mediaConstraints = {
  audio: true,
  video: true,
};

const DEBUG = true;

// eslint-disable-next-line camelcase
const ice_servers = [
  // Information about ICE servers - Use your own!
  'stun.l.google.com:19302',
];

const messageTypes = {
  NEW_ICE_CANDIDATE: 'newICECandidate',
  SDP_OFFER: 'sdpOffer',
};

const log = message => {
  DEBUG && console.log('WebRTC:', message);
};

export default class WebRTCController {
  constructor(listeners, sendToUser, sentToChannel, videoRef) {
    log(`Setting up WebRTC controller with ${listeners}`);

    this.listeners = listeners;
    this.actions = { sendToUser, sentToChannel };

    this.connections = [];
    listeners.forEach(listener => {
      log(`Setting peer connection for ${listener}`);

      const peerConnection = new RTCPeerConnection({ ice_servers });

      peerConnection.onicecandidate = event => {
        this.onicecandidate(listener, event);
      };
      peerConnection.oniceconnectionstatechange = this.oniceconnectionstatechange;
      peerConnection.onicegatheringstatechange = this.onicegatheringstatechange;
      peerConnection.onsignalingstatechange = this.onsignalingstatechange;
      peerConnection.onnegotiationneeded = () =>
        this.onnegotiationneeded(listener);
      peerConnection.ontrack = null;

      this.connections.push({
        userName: listener,
        peerConnection,
      });
    });

    console.warn(videoRef);

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(localStream => {
        console.warn('local strea ', localStream);
        // eslint-disable-next-line no-param-reassign
        videoRef.srcObject = localStream;
        localStream.getTracks().forEach(track =>
          this.connections.forEach(connection => {
            connection.peerConnection.addTrack(track, localStream);
          }),
        );
      })
      .catch(error => {
        log(`Media devices error ${error}`);
      });
  }

  onicecandidate = (listener, event) => {
    log(`Sending ICECandidate ${event}`);
    const { candidate } = event;

    this.actions.sendToUser(listener, messageTypes.NEW_ICE_CANDIDATE, {
      candidate,
    });
  };

  oniceconnectionstatechange = () => {
    log(`ICE connection changed state ${this.iceConnectionState}`);

    if (this.iceConnectionState === 'disconnected') {
      console.warn('Shuould close call');
    }
  };

  onicegatheringstatechange = () => {
    log(`ICE gathering changed state ${this.iceGatheringState}`);
  };

  onsignalingstatechange = () => {
    log(`ICE gathering changed state ${this.signalingState}`);

    if (this.signalingState === 'closed') {
      console.warn('Shuould close video call');
    }
  };

  onnegotiationneeded = async listener => {
    log('Negotiation needed');

    try {
      log('Creating SDP offer');
      const offer = await this.createOffer();

      if (this.signalingState !== 'stable') {
        log("Connection isn't stable");
        return;
      }

      log('Setting local description to the offer');
      await this.setLocalDescription(offer);

      log('Sending the offer to the remote peer');
      this.actions.sendToUser(listener, messageTypes.SDP_OFFER, {
        sdp: this.localDescription,
      });
    } catch (error) {
      log(`Error occured ${error}`);
    }
  };
}

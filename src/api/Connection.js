const DEBUG = true;

const log = message => {
  DEBUG && console.log('WebRTC:', message);
};

export const messageTypes = {
  NEW_ICE_CANDIDATE: 'newICECandidate',
  SDP_OFFER: 'sdpOffer',
};

// eslint-disable-next-line camelcase
const ice_servers = [
  // Information about ICE servers - Use your own!
  'stun.l.google.com:19302',
];

export default class Connection {
  constructor(listener, sendToUser) {
    log(`Setting peer connection for ${listener}`);

    this.listener = listener;
    this.sendToUserAction = sendToUser;

    const peerConnection = new RTCPeerConnection({ ice_servers });

    peerConnection.onicecandidate = this.onicecandidate;
    peerConnection.oniceconnectionstatechange = this.oniceconnectionstatechange;
    peerConnection.onicegatheringstatechange = this.onicegatheringstatechange;
    peerConnection.onsignalingstatechange = this.onsignalingstatechange;
    peerConnection.onnegotiationneeded = this.onnegotiationneeded;
    peerConnection.ontrack = null;

    this.peerConnection = peerConnection;
  }

  addTrack = (track, localStream) => {
    const { peerConnection } = this;

    peerConnection.addTrack(track, localStream);
  };

  /** Found new ICE protocol candiate */
  onicecandidate = event => {
    log(`Sending ICECandidate ${event}`);
    const { candidate } = event;
    const { sendToUserAction, listener } = this;

    sendToUserAction(listener, messageTypes.NEW_ICE_CANDIDATE, {
      candidate,
    });
  };

  /** Fired when the connection has to be negotiated */
  onnegotiationneeded = async () => {
    log('Negotiation needed');

    const { listener, peerConnection, sendToUserAction } = this;

    try {
      log('Creating SDP offer');
      const offer = await peerConnection.createOffer();

      if (peerConnection.signalingState !== 'stable') {
        log("Connection isn't stable");
        return;
      }

      log('Setting local description to the offer');
      await peerConnection.setLocalDescription(offer);

      log('Sending the offer to the remote peer');
      sendToUserAction(listener, messageTypes.SDP_OFFER, {
        sdp: peerConnection.localDescription,
      });
    } catch (error) {
      log(`Error occured ${error}`);
    }
  };

  // oniceconnectionstatechange = () => {
  //   log(`ICE connection changed state ${this.iceConnectionState}`);

  //   if (this.iceConnectionState === 'disconnected') {
  //     console.warn('Shuould close call');
  //   }
  // };

  // onicegatheringstatechange = () => {
  //   log(`ICE gathering changed state ${this.iceGatheringState}`);
  // };

  // onsignalingstatechange = () => {
  //   log(`ICE gathering changed state ${this.signalingState}`);

  //   if (this.signalingState === 'closed') {
  //     console.warn('Shuould close video call');
  //   }
  // };
}

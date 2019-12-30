import React, { Component } from 'react';

export default class ChannelStream extends Component {
  render() {
    return (
      <div className="flexChild p-3" id="camera-container">
        <video width="100%" autoplay controls>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </video>
      </div>
    );
  }
}

// style={{
//   position: 'absolute',
//   left: 0,
//   top: 0,
//   height: '100%',
//   width: '100%',
// }}

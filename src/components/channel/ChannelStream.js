import React, { Component } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { Card, Accordion, Button } from 'react-bootstrap';

export default class ChannelStream extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            <FaPlayCircle /> Stream
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <div className="flexChild p-3" id="camera-container">
            <video width="100%" autoPlay controls>
              <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
            </video>
          </div>
        </Accordion.Collapse>
      </Card>
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

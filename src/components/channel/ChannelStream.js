import React, { Component } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { Card, Accordion, Button } from 'react-bootstrap';

export default class ChannelStream extends Component {
  render() {
    const { children } = this.props;

    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            <FaPlayCircle /> Stream
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">{children}</Accordion.Collapse>
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

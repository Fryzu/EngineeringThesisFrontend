import React, { Component } from 'react';
import { FaComments } from 'react-icons/fa';
import { Card, Accordion, Button } from 'react-bootstrap';

export default class ChannelChat extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="2">
            <FaComments /> Chat
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <div className="flexChild p-3" id="camera-container">
            123
          </div>
        </Accordion.Collapse>
      </Card>
    );
  }
}

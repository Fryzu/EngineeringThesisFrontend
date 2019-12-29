import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FaCogs, FaPlayCircle, FaComments } from 'react-icons/fa';
import ChannelSettings from './ChannelSettings';
import ChannelStream from './ChannelStream';
import ChannelChat from './ChannelChat';

export default class Channel extends Component {
  render() {
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <FaCogs /> Settings
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <ChannelSettings />
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <FaPlayCircle /> Stream
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <ChannelStream />
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              <FaComments /> Chat
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <ChannelChat />
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

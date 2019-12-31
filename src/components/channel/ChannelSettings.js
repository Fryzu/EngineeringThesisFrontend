import React, { Component } from 'react';
import { FaCogs } from 'react-icons/fa';
import { Card, ButtonGroup, Button, Accordion } from 'react-bootstrap';

export default class ChannelSettings extends Component {
  render() {
    const {
      onCloseChannel,
      onResetChannel,
      channelOwner,
      onStartStreaming,
    } = this.props;

    const controls = channelOwner ? (
      <>
        <Button onClick={onStartStreaming} variant="primary">
          Start streaming
        </Button>
        <ButtonGroup aria-label="Basic example">
          {/* <Button variant="secondary">10 listeners</Button> */}
          <Button onClick={onResetChannel} variant="danger">
            Reset channel
          </Button>
          <Button variant="danger" onClick={onCloseChannel}>
            Close channel
          </Button>
        </ButtonGroup>
      </>
    ) : (
      <Button onClick={onResetChannel} variant="warning">
        Leave channel
      </Button>
    );

    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <FaCogs /> Settings
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="justify-content-between d-flex">
            {controls}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

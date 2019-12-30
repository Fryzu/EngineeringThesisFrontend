import React, { Component } from 'react';
import { Card, ButtonGroup, Button } from 'react-bootstrap';

export default class ChannelSettings extends Component {
  render() {
    const { onCloseChannel, channelOwner } = this.props;

    const controls = channelOwner ? (
      <>
        <Button variant="primary">Start streaming</Button>
        <ButtonGroup aria-label="Basic example">
          {/* <Button variant="secondary">10 listeners</Button> */}
          <Button variant="danger">Reset channel</Button>
          <Button variant="danger" onClick={onCloseChannel}>
            Close channel
          </Button>
        </ButtonGroup>
      </>
    ) : (
      <Button variant="warning">Leave channel</Button>
    );

    return (
      <Card.Body className="justify-content-between d-flex">
        {controls}
      </Card.Body>
    );
  }
}
